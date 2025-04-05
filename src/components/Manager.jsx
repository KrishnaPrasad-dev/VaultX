import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


import { useRef } from 'react'
import { IoIosCopy } from "react-icons/io";

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            // Use Clipboard API if available
            navigator.clipboard.writeText(text)
            toast('Copied to clipboard😎!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        } else {
            // Fallback for unsupported browsers
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed"; // Prevent scrolling to the bottom
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            try {
                document.execCommand("copy");
                alert("Password copied to clipboard!");
            } catch (err) {
                console.error("Fallback: Unable to copy", err);
            }

            document.body.removeChild(textarea);
        }
    };



    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/hidden.png")) {
            ref.current.src = "icons/view.png"
            passwordRef.current.type = "text"
        }
        else {
            passwordRef.current.type = "password"
            
            ref.current.src = "icons/hidden.png"

        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const updatedPasswords = [...passwordArray, newPassword];
    
            setpasswordArray(updatedPasswords);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
            console.log(updatedPasswords);
            
            setform({ site: "", username: "", password: "" });
    
            toast('Password Saved Successfully 😎!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast("Password Not Saved 👎", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    


    

    const deletePassword = (id) => {
        console.log("Deleting password")
        let c = confirm("Do You Really Want To Delete This Password?")
        if(c){
            setpasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))

        toast('Password Deleted👌!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });


        }
        
        


    }

    const editPassword = (id) => {
        console.log("editing password")
        setform(passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        
        


    }



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>

            <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />



            <div className="fixed inset-0 -z-10 w-full min-h-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>


            <div className="p-2 md:p-0 m-7 md:mycontainer">
                <h1 className='text-4xl font-bold text-white text-center'>
                    <span className='text-white-600'> &lt;</span>
                    Vault
                    <span className='text-green-600'>X/&gt;</span>
                </h1>
                <p className='text-green-800 font-semibold text-center text-lg'>Your Own Password Manager</p>

                <div className="text-white  flex flex-col gap-7 p-4 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website Name' className='rounded-lg   border-1 text-black   border-[#5B156F] w-full p-4  py-1 ' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full gap-10 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-lg   border-1 text-black   border-[#5B156F] w-full p-4  py-1 ' type="text" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-lg   border-1 text-black   border-[#5B156F] w-full p-4  py-1 ' type="password" name='password' id='password' />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer ' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="/icons/view.png" alt="" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-[#831d9f] hover:bg-[#541565] rounded-xl px-4 py-2 border-2 border-violet-800 w-fit text-black font-semibold'>
                        <lord-icon
                            src="https://cdn.lordicon.com/ebkiwugo.json"
                            trigger="hover"
                            colors="primary:#4bb3fd,secondary:#3a3347,tertiary:#4030e8"
                        >
                        </lord-icon>


                        Save Password</button>
                </div>

                <div className="passwords mb-24">
                    <h2 className='text-white font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-red-500 font-bold m-2'> *No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto mb-10 w-full rounded-lg overflow-hidden">
                            <thead className='bg-[#5B156F] text-white '>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='py-2   border-4 border-white text-center w-24'>{item.site} </td>
                                        <td className='py-2   border-4 border-white text-center w-24'>{item.username}</td>

                                        <td className='py-2   border-4 border-white text-center w-24'>
                                            <div className="flex justify-between items-center mx-3">
                                                <span>{item.password}</span>
                                                <div className="cursor-pointer  mx-3" onClick={() => copyText(item.password)}>
                                                    <IoIosCopy />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-2   border-4 justify-center  border-white text-center w-24'>
                                            <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/vhyuhmbl.json"
                                                    trigger="hover"
                                                    colors="primary:#66a1ee,secondary:#c71f16,tertiary:#000000"
                                                    style={{ "width": "35px", "height": "35px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hjbrplwk.json"
                                                    trigger="hover"
                                                    colors="primary:#646e78,secondary:#4bb3fd,tertiary:#66a1ee,quaternary:#000000"
                                                    style={{ "width": "35px", "height": "35px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>




                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
