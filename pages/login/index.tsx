import { login } from "@/actions/user-actions";
import { displayError } from "@/util/toast-util";
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const [isVisible, changeVisible] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const toggleVisibility = () => {
        changeVisible(!isVisible);
    }
    const handleLogin = async (formData: FieldValues) => {
        try {
            console.log("e");
            await login(formData)
        } catch(e) {
            console.error(e);
            displayError(e as Error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="p-6 w-full max-w-md gap-4" radius="none">
                <CardBody>
                    <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h1>
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                        <Input type="email" label="Email"
                         className="mb-4" variant="bordered"
                          radius="sm"
                          isInvalid={!!errors.email}
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}/>
                        <Input label="Password"
                        variant="bordered"
                        type={isVisible ? "text" : "password"}
                        radius="sm"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                              {isVisible ? (
                                <FaEye className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                        className="mb-6 bg-white"
                        {...register('password', {required: 'Password is required'})}/>
                        <Button className="w-full p-2" size="lg" color="primary" radius="sm">Login</Button>
                    </form>
                </CardBody>
                <CardFooter className="flex flex-col items-center justify-center ">
                    <p className="text-center text-gray-700 flex items-center justify-center">Don't have an account? 
                        <a href="/signup" className="text-blue-600 hover:underline ml-1">Sign Up</a>
                    </p>
                    <p className="text-center text-gray-700 mt-2">
                        <a href="/home" className="text-blue-600 hover:underline">Back to Home</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
        
    )
}