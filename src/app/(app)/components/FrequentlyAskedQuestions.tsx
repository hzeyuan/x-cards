"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import BoldCopy from "@src/components/ui/bold-copy"

export const FrequentlyAskedQuestions = () => {
    return (
        <div>
            <BoldCopy
                className="border border-gray-200 dark:border-zinc-800"
                text="FAQ">

            </BoldCopy>
            <div className="not-prose mt-4 flex flex-col gap-4 md:mt-8 text-2xl">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>1.Why was this product created?</AccordionTrigger>
                        <AccordionContent className="py-8 text-xl">
                            Our product was born out of a common workplace challenge. Many of us find ourselves juggling numerous websites throughout our workday. With an ever-growing list of URLs to remember, it's easy to get overwhelmed. This tool was developed to streamline your digital workflow and keep all your important web resources organized in one place.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>2.Do you collect or share my data?</AccordionTrigger>
                        <AccordionContent className="py-8 text-xl">
                            Your privacy is our top priority. All data is stored locally on your device. We do not have access to, collect, or share any of your personal information or browsing history. Your data remains entirely under your control.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>3. What are your future plans for the product?</AccordionTrigger>
                        <AccordionContent className="py-8 text-xl">
                            We're constantly working on improvements and new features! To stay up-to-date with our latest developments:
                            <li>Follow us on Twitter/X for real-time updates</li>
                            <li>Check our website regularly for announcements</li>
                            <li>Join our mailing list for exclusive news and features</li>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </div>

    )
}


