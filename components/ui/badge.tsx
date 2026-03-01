import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "border-transparent bg-primary text-primary-foreground shadow",
                secondary: "border-transparent bg-secondary text-secondary-foreground",
                destructive: "border-transparent bg-destructive text-destructive-foreground shadow",
                outline: "text-foreground",
                live: "border-transparent bg-red-500/20 text-red-400 animate-pulse",
                format: "border-transparent bg-cricket-green/30 text-cricket-lime",
                win: "border-transparent bg-green-500/20 text-green-400",
                loss: "border-transparent bg-red-500/20 text-red-400",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
