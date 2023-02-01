import React from 'react'
import { Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { css, StyleSheet} from 'aphrodite'
import NavBar from '../Components/NavBar/NavBar'
import UserProfileData from '../Components/Users/UserProfile'

const { Meta } = Card;

const styles = StyleSheet.create({
  profileContainer: {
    display:'flex',
    flexFlow: 'row wrap',
    gap: '5rem',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '4rem'
  }
})

 const Profile = () => {
  return (
    <>
    <NavBar />
    <div className={css(styles.profileContainer)}>
      <Card
      hoverable
      style={{ width: 240 }}
      cover={<Avatar size={64} icon={<UserOutlined />} />}
      >
        <Meta title="RH Manager" />
      </Card>
      <UserProfileData />
    </div>
    </>
  )
}
export default Profile