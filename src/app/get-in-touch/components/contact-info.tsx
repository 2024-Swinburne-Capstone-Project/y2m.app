import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInTouchConfig } from "@/config/get-in-touch";

const ContactInfo: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <Card>
                <CardHeader>
                    <CardTitle>Visit Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{getInTouchConfig.visitUs.address}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Mail Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{getInTouchConfig.mailUs.email}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ContactInfo;
