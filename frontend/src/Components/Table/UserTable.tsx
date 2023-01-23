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

const UsersTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([])
  const [editingKey, setEditingKey] = useState('');
  const [count, setCount] = useState(data.length);


  useEffect(() => {
    const userData: Item[] = []
    const getUsers = async () => {
      const res = await axios.get("http://localhost:5100/api/v1/users")
      res.data.map(({id, username, phone, email}: any) => {
        userData.push(
          { key: id,
            username: username,
            email: email,
            phone: phone,
      })
      return userData
    })
    setData(userData as any)
      
    }
    getUsers();
  },[])

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
          
        const res = await axios.put("http://localhost:5100/api/v1/update",{
          id: Number(item.key),
          username: row.username,
          email: row.email,
          phone: row.phone
        });
          
        if (res.data.username === row.username) {
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
        inputType: col.dataIndex === 'email' && 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        
      }),
    };
  });

  return (
    <div style={{maxWidth: '70rem', marginInline: 'auto', marginBottom: '6rem'}}>
    <Form form={form} component={false}>
       <Link to='/Adduser'>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16, backgroundColor: 'red'}}>Add New User</Button>
        </Link>
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

export default UsersTable;


