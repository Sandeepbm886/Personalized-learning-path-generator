import React from 'react'
import Addcourse from './_components/Addcourse'
import UserCourseList from './_components/UserCourseList'


function Dashboard() {
  return (
    <div>
      <Addcourse/>
      <UserCourseList/>
    </div>
  )
}

export default Dashboard