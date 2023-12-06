import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuthChanged from '../../Hooks/useAuthChanged';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProfileResetPassword = () => {

    const { user } = useAuthChanged();
    //console.log("userdata", user?.userid);


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const oldPassword = form.oldPassword.value;
        const newPassword = form.newPassword.value;
        const conNewPassword = form.conNewPassword.value;

        const oldPasswordPayload = {
            oldPass: oldPassword
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update your password ?",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`http://localhost:8080/api/users/checkpassword/${user?.userid}`, oldPasswordPayload)
                    .then((response) => {
                        if (response?.statusText) {
                            if (newPassword === conNewPassword) {
                                const passwordPayload = {
                                    password: newPassword
                                }
                                axios.put(`http://localhost:8080/api/users/updatepassword/${user?.userid}`, passwordPayload)
                                    .then((response) => {
                                        //console.log("password changed", response);
                                          Swal.fire(
                                            'Updated!',
                                            'Your password has been updated successfully.',
                                            'success'
                                          )
                                    })
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Confirm password does not match.',
                                })
                            }
                        }
                    })
                    .catch((error) => {
                        //console.log("Error matching old password", error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Old password does not match.',
                        })
                    })
            }
        })
    }



    return (
        <div>
            <div className="p-4 border-b-2 text-lg font-semibold bg-white flex justify-between  ">
                <p>Reset Password</p>
            </div>

            <div className="p-x-2 pt-4 pb-2 bg-white  border-b-2 mb-9">
                <div className="max-w-full w-full md:w-6/12  mx-auto text-center shadow-lg p-2 ">
                    <div className="rounded-md bg-white p-3">
                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                                <div className="md:col-span-2 phone-input">
                                    <FormControl
                                        variant='standard'
                                        fullWidth
                                    >
                                        <InputLabel htmlFor="standard-adornment-password">Old password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type="password"
                                            name="oldPassword"
                                            placeholder='Enter old password'
                                            required
                                        />
                                    </FormControl>
                                </div>
                                <div className="md:col-span-2 phone-input">
                                    <FormControl
                                        variant='standard'
                                        fullWidth
                                    >
                                        <InputLabel htmlFor="standard-adornment-password">New password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type="password"
                                            name="newPassword"
                                            placeholder='Enter new password'
                                            required
                                        />
                                    </FormControl>
                                </div>
                                <div className="md:col-span-2 phone-input">
                                    <FormControl
                                        variant='standard'
                                        fullWidth
                                    >
                                        <InputLabel htmlFor="standard-adornment-password">Re-enter new password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type="password"
                                            name="conNewPassword"
                                            placeholder='Confirm new password'
                                            required
                                        />
                                    </FormControl>
                                </div>

                                <div className=" md:col-span-2 text-right">
                                    <button className="outline-none w-36 py-3 text-base font-medium rounded text-white bg-[#0EA5E9] hover:bg-[#37728b] transition duration-300">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileResetPassword;