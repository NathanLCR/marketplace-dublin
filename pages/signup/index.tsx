import { signUp } from "@/actions/user-actions";
import PasswordStrengthMeter from "@/components/password-strength-meter";
import { displayError } from "@/util/toast-util";
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const [isVisible, setVisible] = useState(false);
    const [password, setPassword] = useState(""); 
    const { register, handleSubmit, formState: { errors } } = useForm();

    const toggleVisibility = () => {
        setVisible(!isVisible);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleSignup = async (formData: FieldValues) => {
        console.log('e');
        try {
            await signUp(formData)
        } catch(e) {
            displayError(e as Error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="p-6 w-full max-w-md gap-4" radius="none">
                <CardBody>
                    <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Sign Up</h1>
                    <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
                        <Input type="email" label="Name"
                            className="mb-4" variant="bordered"
                            radius="sm"
                            isInvalid={!!errors.fullName}
                            errorMessage={errors.fullName?.message}
                            {...register('fullName', { required: 'Name is required'})}
                          />
                        <Input type="email" label="Email"
                            className="mb-4" variant="bordered"
                            radius="sm"
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                            {...register('email', { required: 'E-mail is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                        />
                        <Input type="number" label="Cellphone" 
                            className="mb-4" variant="bordered" 
                            radius="sm"
                            isInvalid={!!errors.cellphoneNumber}
                            errorMessage={errors.cellphoneNumber?.message}
                            {...register('cellphoneNumber', { required: 'Cellphone Number is required'})}
                        />
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
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                validate: (value) => 
                                /[a-z]/.test(value) || 'Password must include at least one lowercase letter' &&
                                /[A-Z]/.test(value) || 'Password must include at least one uppercase letter' &&
                                /[0-9]/.test(value) || 'Password must include at least one number' &&
                                /[^A-Za-z0-9]/.test(value) || 'Password must include at least one special character'
                            })} onChange={handlePasswordChange}
                        />
                        <PasswordStrengthMeter password={password} />
                        <Button type="submit" className="w-full p-2" size="lg" color="primary" radius="sm">Sign Up</Button>
                    </form>
                </CardBody>
                <CardFooter className="flex flex-col items-center justify-center ">
                    <p className="text-center text-gray-700 flex items-center justify-center">Have an account? 
                        <a href="/login" className="text-blue-600 hover:underline ml-1">Login</a>
                    </p>
                    <p className="text-center text-gray-700 mt-2">
                        <a href="/home" className="text-blue-600 hover:underline">Back to Home</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
        
    )
}