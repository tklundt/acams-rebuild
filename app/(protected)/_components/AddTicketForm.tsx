"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { TicketSchema } from "@/schemas"
import {Input} from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { addticket } from "@/actions/addticket";

interface TicketInfoProps {
    assetId: string | undefined,
}

export const AddTicketForm = ({
    assetId
}: TicketInfoProps) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof TicketSchema>>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            assetId: assetId,
            subject: "",
            description: "",
            adminNote: "",
            status: "Open",
        }
    })

    const onSubmit = (values: z.infer<typeof TicketSchema>) => {
        setError("");
        setSuccess("");

        startTransition( ()=> {
            addticket(values)
        })
    }

    return (
        <CardWrapper
        headerLabel="Create Ticket"
        backButtonLabel="Return to assets"
        backButtonHref="/assets"
        >
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                    <div className="space-y-4">

                    {/* Asset ID Field */}
                    <FormField 
                        control={form.control}
                        name="assetId"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Asset ID</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled
                                    placeholder={assetId}
                                    value={assetId}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Subject Field */}
                    <FormField 
                        control={form.control}
                        name="subject"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="e.g. I need this asset..."
                                    required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    {/* Description Field */}
                    <FormField 
                        control={form.control}
                        name="description"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="e.g. Please assign this asset to acams-user1"
                                    required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />                  
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full bg-red-950"
                    >
                        Create Ticket
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}