import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button} from 'antd';
import axios from 'axios';


interface Item {
  key: string;
  xField: string;
  yField: string;
  zField: string;
  dataId: string;
}



interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ChartsTable: React.FC<{ChartData: any, lastId: any}> = ({ ChartData, lastId }) => {

  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const [count, setCount] = useState(lastId + 1);
  const [newAdd, setNewAdd] = useState<boolean>();
  const [saveAction, setSaveAction] = useState<boolean>();
  // Get Data for Each Table
  const dataList: any = Object.values(ChartData)
  const Type = dataList[0]
  const tableData = dataList[4]
  const DataId = tableData[0].dataId
  

  useEffect(() => {
    const getChartsData = async () => {
      const newData: Item[] = []
      tableData.map(({id, xField, yField, zField, dataId}: any) => {
          newData.push({
                key: id,
                xField: xField,
                yField: yField,
                zField: zField,
                dataId: dataId
    })
    
    return newData
  })
  setData(newData)
    }
    getChartsData();
  }, [tableData])

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ dataId: '', xField: '', yField: '', zField: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  //Handle Delete data Column
  const handleDelete = async (key: React.Key) => {
    const user = JSON.parse(localStorage.getItem('user') as any);
    const deletedChartRow: any = data.filter((item) => item.key === key)

    try {
      const res = await axios.delete(`http://localhost:5100/api/v1/deletechartrow?id=${deletedChartRow[0].key}`,
        { headers: {
          Authorization: `Bearer ${user}` 
        }})
        if(res) {
          const newData = data.filter((item) => item.key !== key);
          setData(newData);
        }
      } catch(err) {
        console.log(err)
      }
    
  };

  // handle add a new chart row
  const handleAdd = () => {
    const newData: Item = {
      key: count.toString(),
      xField: '',
      yField: '',
      zField: '',
      dataId: DataId
    };
    form.setFieldsValue({ username: '', email: '', phone: ''});
    setEditingKey(newData.key);
    setData([newData, ...data]);
    setCount(count + 1);
    setNewAdd(true)

  };
  
  //Handle Save Chart Data
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        if (row.zField === undefined ) row.zField = '0';
        if(!newAdd) {
          //save the updated row of chart
         const updateResult = await axios.put("http://localhost:5100/api/v1/updatechart",{
          id: Number(item.key),
          xField: row.xField,
          yField: row.yField,
          zField: row.zField,
          dataId: row.dataId
        });
        updateResult.data && setSaveAction(true)
      } else {
          // save the created row of chart
          const createResult = await axios.post("http://localhost:5100/api/v1/addrowchart", {
          
          id: Number(item.key),
          xField: row.xField,
          yField: row.yField,
          zField: row.zField,
          dataId: item.dataId
        })
        createResult.data && setSaveAction(true)
        setNewAdd(false)
        }
        
          
        if (saveAction) {
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          
          setData(newData);
          setEditingKey('');
          console.log("Success to uapdte Chart data")
        } else {
          console.log("Failed to update chart data")
        }

      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const columns = [
    {
      title: 'Axe X',
      dataIndex: 'xField',
      width: '30%',
      editable: true,
    },
    {
      title: 'Axe Y',
      dataIndex: 'yField',
      width: '27%',
      editable: true,
      
    },
    {
      title: 'Name',
      dataIndex: 'zField',
      width: '27%',
      editable: true,
    },
    {
      title: 'Actions',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return <div style={{ display: 'flex', justifyContent: 'center'}}>
          {editable ? (
          <div>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8}}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a href='#cancel' onClick={(e) => e.preventDefault()}>Cancel</a> 
            </Popconfirm>
          </div>
        ) : (
          <div>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: '2rem'}}>
            Edit
          </Typography.Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <Typography.Link>Delete</Typography.Link>
          </Popconfirm>
        </div>
        
        )
      }</div>
      },
    },
  ];

  //Check The Chart Type to return correspond Table Type
  if ( Type === 'pie' || Type === 'rose') {
    columns.splice(2,1)
    columns[0].title = 'Type'
    columns[1].title = 'Value'
    columns.map((items) => {
      return (items.width = '40%'
      )
    })
  }


  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'axeX' && 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        
      }),
    };
  });

  return (
    <div style={{maxWidth: '70rem', marginInline: 'auto', marginBottom: '.5rem'}}>
    <Form form={form} component={false}>
    <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16, backgroundColor: 'red'}}>Add New Row</Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        
      />
    </Form>
    </div>
  );
};

export default ChartsTable;


