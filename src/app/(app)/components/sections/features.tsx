// import { Icon } from "@/components/ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Icon } from "@src/components/ui/icon";
import { icons } from "lucide-react";
interface FeaturesProps {
    icon: string;
    title: string;
    description: string;
}

const featureList: FeaturesProps[] = [
    {
        icon: "Globe",
        title: "Seamless Integration",
        description: "Integrate directly on x.com without any hassle. Our product works smoothly within the platform you're already using.",
    },
    {
        icon: "MousePointerClick",
        title: "One-Click Generation",
        description: "Simple and easy to use. Generate and copy cards with just a single click, streamlining your workflow.",
    },
    {
        icon: "Palette",
        title: "Customizable Design",
        description: "Personalize your cards by modifying styles, background colors, and more to match your brand or preferences.",
    },
    {
        icon: "Eye",
        title: "Real-Time Preview",
        description: "See your changes instantly and manage your tweets dynamically, ensuring your content looks perfect before posting.",
    },
    {
        icon: "FileText",
        title: "Long-Form Support",
        description: "Create and manage longer posts effortlessly, perfect for in-depth content or thread creation.",
    },
    {
        icon: "Lock",
        title: "Open Source & Secure",
        description: "Our product is open source, ensuring transparency and allowing for community contributions while maintaining high security standards.",
    },
];

export const FeaturesSection = () => {
    return (
        <section id="features" className="container py-24 sm:py-32">
            <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
                Features
            </h2>

            <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
                Why Choose Our Twitter Card Generator
            </h2>

            <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
                Elevate your Twitter presence with our seamless, customizable, and secure card generator.
                Create eye-catching content directly on x.com with just a few clicks.
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featureList.map(({ icon, title, description }) => (
                    <div key={title}>
                        <Card className="h-full bg-background border-0 shadow-none">
                            <CardHeader className="flex justify-center items-center">
                                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                                    <Icon
                                        name={icon as keyof typeof icons}
                                        size={24}
                                        color="hsl(var(--primary))"
                                        className="text-primary"
                                    />
                                </div>

                                <CardTitle>{title}</CardTitle>
                            </CardHeader>

                            <CardContent className="text-muted-foreground text-center">
                                {description}
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
};