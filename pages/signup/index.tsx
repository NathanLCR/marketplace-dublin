import PasswordStrengthMeter from "@/components/password-strength-meter";
import { Button } from "@nextui-org/button"
import { Card, CardBody, CardFooter } from "@nextui-org/card"
import { Input } from "@nextui-org/input"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const [isVisible, setVisible] = useState(false);
    const [password, setPassword] = useState(""); 
    const toggleVisibility = () => {
        setVisible(!isVisible);
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleLogin = async (formData: FormData) => {
        // try {
        //     await login(formData)
        // } catch(e) {
        //     displayError(e as Error);
        // }
        
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="p-6 w-full max-w-md gap-4" radius="none">
                <CardBody>
                    <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Sign Up</h1>
                    <form className="space-y-4">
                        <Input type="email" label="Name" className="mb-4" variant="bordered" radius="sm"/>
                        <Input type="text" label="Email" className="mb-4" variant="bordered" radius="sm"/>
                        <Input type="number" label="Cellphone" className="mb-4" variant="bordered" radius="sm"/>
                        <Input label="Password"
                        variant="bordered"
                        type={isVisible ? "text" : "password"}
                        radius="sm"
                        onChange={handlePasswordChange}
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                              {isVisible ? (
                                <FaEye className="text-2xl text-default-400 pointer-events-none" />
                              ) : (
                                <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                        className="mb-6 bg-white"/>
                        <PasswordStrengthMeter password={password} />
                        <Button className="w-full p-2" size="lg" color="primary" radius="sm">Login</Button>
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