import React, { useEffect, useState, useReducer } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import axios from 'axios';
import { css, StyleSheet} from 'aphrodite';
import  jwt_decode from "jwt-decode"


const styles = StyleSheet.create({
  tableStyle: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
})


interface Item {
  key: string;
  titleField: string;
  dataField: string;
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


const UserProfileData: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([])
  const [editingKey, setEditingKey] = useState('');
  const user: any = jwt_decode(JSON.parse(localStorage.getItem("user") as any))
  const initialState = {username: '', email: '', phone : 0}
  const [userData, setUserData] = useReducer(
    (state: any, updates: any) =>  ({ ...state, ...updates }), initialState)



  useEffect(() => {
    const getUser = async() => {
      const userData = await axios.get(`http://localhost:5100/api/v1/id?id=${user.id}`)
      setData([{
        key: '1',
        titleField: 'Username',
        dataField: userData.data.data.username,
      },{
        key: '2',
        titleField: 'Email adress',
        dataField: userData.data.data.email,
      },
      {
        key: '3',
        titleField: 'Phone number',
        dataField: userData.data.data.phone,
      }
      ])
      setUserData({
        username: userData.data.data.username,
        email: userData.data.data.email,
        phone : userData.data.data.phone
      })
    }
    getUser();
  },[user.id])

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ titleField: '', dataField: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };




  //Handle update user
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
     
      if (index > -1) {
        const item = newData[index];
        if (item.titleField === 'Username') {
          setUserData({username: row.dataField})
        } else if (item.titleField === 'Email adress') {
          setUserData({email: row.dataField})
        } else {
          setUserData({phone: Number(row.dataField)})
        }
        const res = await axios.put("http://localhost:5100/api/v1/update",{
          id: user.id,
          username: userData.username,
          email: userData.email,
          phone: userData.phone
        }); 
        console.log("res", res.data)
        if (res.data.titleField === row.titleField) {
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setData(newData);
          setEditingKey('');
          console.log("Success to uapdte user")
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
      title: 'titleField',
      dataIndex: 'titleField',
      width: '30%',
      editable: false,
      
    },
    {
      title: 'dataField',
      dataIndex: 'dataField',
      width: '50%',
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
        inputType: col.dataIndex === 'dataField' && 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        
      }),
    };
  });

  return (
    <div style={{width: '38rem'}}>
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        size='large'
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        showHeader={false}
        className={css(styles.tableStyle)}
      />
    </Form>
    </div>
  );
};

export default UserProfileData;


