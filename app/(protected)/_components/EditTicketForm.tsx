'use client';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { editticket } from "@/actions/editticket";
import Link from "next/link";
import { Pencil1Icon } from "@radix-ui/react-icons";

//urlID is the appended string that will reference the ticket in database
interface TicketInfoProps {
    urlId: string,
    assetId?: string | null,
    subject: string,
    description: string,
    adminNote?: string | null,
    createDate: Date,
    status: string
}

export const EditTicketForm = ({
    urlId,
    assetId,
    subject,
    description,
    adminNote,
    createDate,
    status,
}:TicketInfoProps) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof TicketSchema>>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            subject:  subject || undefined,
            description: description || undefined,
            adminNote: adminNote || undefined,
            status: status || undefined,
        }
    })

    const onSubmit = (values: z.infer<typeof TicketSchema>) => {
        setError("");
        setSuccess("");

        startTransition( ()=> {
            editticket(values,urlId)
        })
    }

    return (
        <CardWrapper
        headerLabel="View/Edit Ticket"
        backButtonLabel="Return to tickets"
        backButtonHref="/tickets"
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
                                <div className="flex justify-between items-center">
                                    <div className="flex">
                                        <FormLabel className="flex">Asset ID</FormLabel>
                                    </div>
                                    {assetId && (
                                    <div className="flex">
                                        <Link className="flex" href={`/editAsset?a=${assetId}`}>
                                            <span className="text-sm items-center text-blue-700">[ Edit asset ]</span>
                                        </Link>
                                    </div>
                                    )}
                                </div>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled
                                    // @ts-ignore
                                    placeholder={assetId}
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
                                    disabled
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
                                    disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Admin Note Field */}
                    <FormField 
                        control={form.control}
                        name="adminNote"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Admin's Note</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Status Select Field */}
                    <FormField 
                        control={form.control}
                        name="status"
                        render={({field})=>(
                            <FormItem>
                               <FormLabel>Status</FormLabel>
                               <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                               >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Set ticket status:"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"Open"}>Open</SelectItem>
                                        <SelectItem value={"Closed"}>Closed</SelectItem>
                                    </SelectContent>
                               </Select>
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
                        Save Changes
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}