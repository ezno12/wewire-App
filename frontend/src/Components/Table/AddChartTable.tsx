import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button } from 'antd';
import axios from 'axios';


interface Item {
  key: string;
  xField: string;
  yField: string;
  zField: string;
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

const AddChartTable: React.FC = () => {
  
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState('');
  const [count, setCount] = useState(data.length);


  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ xField: '', yField: '', zField: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  // handle add a new user
  const handleAdd = () => {
    const newData: Item = {
      key: count.toString(),
      xField: '',
      yField: '',
      zField: '',
    };
    form.setFieldsValue({ xField: '', yField: '', zField: ''});
    setEditingKey(newData.key);
    setData([...data, newData]);
    setCount(count + 1);
  };

  //Handle Delet user
  const handleDelete = async (key: React.Key) => {
    const user = JSON.parse(localStorage.getItem('user') as any);
    const deletedUser: any = data.filter((item) => item.key === key)
    console.log(deletedUser[0].username)
    try {
      const res = await axios.delete(`http://localhost:5100/api/v1/user?username=${deletedUser[0].username}`,
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

  //Handle Save user
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      
      
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];

          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          
          setData(newData);
          setEditingKey('');

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
      title: 'xField',
      dataIndex: 'xField',
      width: '27%',
      editable: true,
      
    },
    {
      title: 'yField',
      dataIndex: 'yField',
      width: '30%',
      editable: true,
    },
    {
      title: 'zField',
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'yField' && 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        
      }),
    };
  });

  return (
    <div style={{width: '85%', marginInline: 'auto', marginBottom: '1rem'}}>
    <Form form={form} component={false}>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16, backgroundColor: 'red'}}>Add Row</Button>
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

export default AddChartTable;


