import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useCardStore } from "@src/hooks/useCardStore";
import { useTemplatesStore } from "@src/hooks/useTemplatesStore";
import React from "react";

export const SaveAsTemplateButton = () => {
    const cardStyles = useCardStore((state) => state.cardStyles);
    const addTemplate = useTemplatesStore((state) => state.addTemplate);
    const backgroundStyles = useCardStore((state) => state.backgroundStyles);
    const [name, setName] = React.useState('');

    return (<AlertDialog>
        <AlertDialogTrigger asChild>
            <Button size="sm" >Save as Template</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Input Template Name</AlertDialogTitle>
                {/* <AlertDialogDescription>
    This action cannot be undone. This will permanently delete your
    account and remove your data from our servers.
</AlertDialogDescription> */}
                <Input value={name} onChange={(e) => {
                    setName(e.target.value)
                }}></Input>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => addTemplate({
                    name: name,
                    fontStyles: useCardStore.getState().fontStyles,
                    colorIndex: useCardStore.getState().colorIndex,
                    backgroundStyles: backgroundStyles,
                    tabConfig: useCardStore.getState().tabConfig,
                    cardStyles: cardStyles
                })}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>)
}