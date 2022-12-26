import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button } from 'antd';
import axios from 'axios';
import {Link } from 'react-router-dom'


interface Item {
  key: string;
  username: string;
  email: string;
  phone: string;
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

const App: React.FC = () => {
  const userData: Item[] = []
  const [form] = Form.useForm();
  const [data, setData] = useState(userData);
  const [editingKey, setEditingKey] = useState('');
  const [count, setCount] = useState(data.length)


  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("http://localhost:5100/api/v1/users")
      
      res.data.map(({id, username, phone, email}: any) =>
        userData.push(
          { key: id,
            username: username,
            email: email,
            phone: phone,
      }))
      setData(userData)
    }
    getUsers();
  }, [userData])

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ username: '', email: '', phone: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  // handle add a new user
  const handleAdd = () => {
    const newData: Item = {
      key: count.toString(),
      username: 'Default Username',
      phone: 'Default Phone',
      email: 'Default Email',
    };
    setData([...data, newData]);
    setCount(count + 1);
  };

  //Handle Delet user
  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  //Handle Save user
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      console.log(newData)
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
      title: 'Username',
      dataIndex: 'username',
      width: '27%',
      editable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '30%',
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '27%',
      editable: true,
    },
    {
      title: 'Actions',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8}}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </>
        ) : (
          <>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8}}>
            Edit
          </Typography.Link>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <Typography.Link>Delete</Typography.Link>
          </Popconfirm>
        </>
        );
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
        inputType: col.dataIndex === 'email' && 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div style={{maxWidth: '50rem', margin: '2rem 2rem'}}>
    <Form form={form} component={false}>
       <Link to='/Adduser'><Button onClick={handleAdd} type="primary" style={{ marginBottom: 16, backgroundColor: 'red'}}>Add New User</Button></Link>
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

export default App;


