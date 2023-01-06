import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button } from 'antd';
import axios from 'axios';


interface Item {
  key: string;
  axeY: string;
  axeX: string;
  name: string;
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

const ChartsTable: React.FC = (chartData: any) => {
  
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const [count, setCount] = useState(data.length);
  const [Type, tableData]: any = Object.values(chartData)

  useEffect(() => {
    const getChartsData = async () => {
      const newData: Item[] = []
      
      tableData.map(({id, xField, yField, zField}: any) => {
          newData.push({
                key: id,
                axeY: xField,
                axeX: yField,
                name: zField,
    })
    setData(newData)
  })
    }
    getChartsData();
  },[])
  
  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ axeY: '', axeX: '', name: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const handleAdd = () => {
    const newData: Item = {
      key: count.toString(),
      axeY: 'Default axeY',
      name: 'Default name',
      axeX: 'Default axeX',
    };
    setData([...data, newData]);
    setCount(count + 1);
  };

  //Handle Delete data Column
  const handleDelete = async (key: React.Key) => {
    const user = JSON.parse(localStorage.getItem('user') as any);
    const deletedUser: any = data.filter((item) => item.key === key)
    console.log(deletedUser[0].axeY)
    try {
      const res = await axios.delete(`http://localhost:5100/api/v1/user?axeY=${deletedUser[0].axeY}`,
      { headers: {
        Authorization: `Bearer ${user}` 
      }})
      if(res) {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
      }
} catch(err) {

}
    
  };

  //Handle Save Chart Data
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      console.log("row is:", row)
      
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
          
        const res = await axios.put("http://localhost:5100/api/v1/update",{
          id: Number(item.key),
          axeY: row.axeY,
          axeX: row.axeX,
          name: row.name
        });
          
        if (res.data.axeY === row.axeY) {
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          
          setData(newData);
          setEditingKey('');
          console.log("Success to uapdte usre")
        } else {
          console.log("Failed to update user")
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
      title: 'Axe Y',
      dataIndex: 'axeY',
      width: '27%',
      editable: true,
      
    },
    {
      title: 'Axe X',
      dataIndex: 'axeX',
      width: '30%',
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
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
              <a>Cancel</a>
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


