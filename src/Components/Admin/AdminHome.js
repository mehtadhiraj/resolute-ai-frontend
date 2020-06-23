import React from 'react';
import './Admin.css';

function AdminHome(props){
    return(
        <div>
            <h2>Welcome Admin</h2>
            <h4>Users</h4>
            <table>
                <tbody>
                    <tr key={0}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>DOB</th>
                        <th>Username</th>
                        <th>Role</th>
                    </tr>
                    {
                        // Display users detials in row
                        props.userArray.map((user, x)=>{
                            return(
                                <tr key={x+1}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.dob}</td>
                                    <td>{user.username}</td>
                                    <td>{user.role}</td>
                                </tr>
                            )        
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default AdminHome;