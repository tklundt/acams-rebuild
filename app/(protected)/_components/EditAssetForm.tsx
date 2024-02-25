'use client';
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { AssetSchema } from "@/schemas"
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
import { editasset } from "@/actions/editasset";


interface AssetInfoProps {
    urlId: string,
    type: string,
    status: string,
    usedBy?: string | null,
    name: string,
    description?: string | null,
    condition: string
}

export const EditAssetForm = ({
    urlId,
    type,
    status,
    usedBy,
    name,
    description,
    condition,
}:AssetInfoProps) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof AssetSchema>>({
        resolver: zodResolver(AssetSchema),
        defaultValues: {
            type:  type || undefined,
            status: status || undefined,
            usedBy: usedBy || undefined,
            name: name || undefined,
            description: description || undefined,
            condition: condition || undefined,
        }
    })

    const onSubmit = (values: z.infer<typeof AssetSchema>) => {
        setError("");
        setSuccess("");

        startTransition( ()=> {
            editasset(values,urlId)
        })
    }

    return (
        <CardWrapper
        headerLabel="Edit Existing Asset"
        backButtonLabel="Return to dashboard"
        backButtonHref="/dashboard"
        >
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                    <div className="space-y-4">

                    {/* Type Select Field */}
                    <FormField 
                        control={form.control}
                        name="type"
                        render={({field})=>(
                            <FormItem>
                               <FormLabel>Type</FormLabel>
                               <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                               >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose asset type:"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"Hardware"}>Hardware</SelectItem>
                                        <SelectItem value={"Software"}>Software</SelectItem>
                                        <SelectItem value={"Display"}>Display</SelectItem>
                                        <SelectItem value={"Device"}>Device</SelectItem>
                                        <SelectItem value={"DesktopPC"}>DesktopPC</SelectItem>
                                        <SelectItem value={"LaptopPC"}>LaptopPC</SelectItem>
                                        <SelectItem value={"Component"}>Component</SelectItem>
                                        <SelectItem value={"Peripheral"}>Peripheral</SelectItem>
                                        <SelectItem value={"Misc"}>Misc</SelectItem>
                                    </SelectContent>
                               </Select>
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
                                            <SelectValue placeholder="Select status:"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"Storage"}>Storage</SelectItem>
                                        <SelectItem value={"InUse"}>In Use</SelectItem>
                                    </SelectContent>
                               </Select>
                            </FormItem>
                        )}
                    />
                    {/* UsedBy Field */}
                    <FormField 
                        control={form.control}
                        name="usedBy"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Asset assignment</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="e.g. John Doe, jdoe, jdoe@example.com etc."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Name Field */}
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Asset Name</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="e.g. Corsair Vengeance Pro DDR4 16GB"
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
                                <FormLabel>Asset Description/Details</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="e.g. 2x8GB 3200MHz CL16 Intel XMP 2.0 iCUE Compatible"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Condition Select Field */}
                    <FormField 
                        control={form.control}
                        name="condition"
                        render={({field})=>(
                            <FormItem>
                               <FormLabel>Condition</FormLabel>
                               <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                               >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="State condition:"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"Good"}>Good</SelectItem>
                                        <SelectItem value={"Used"}>Used</SelectItem>
                                        <SelectItem value={"Poor"}>Poor</SelectItem>
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