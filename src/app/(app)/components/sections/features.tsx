// import yellowWaveDown from "@/public/images/banner-wave.png";
// import Image from "next/image";
import { BookCopy, LayoutGrid, ListCollapse, Palette } from "lucide-react";
import { useId } from "react";

export function FeaturesGridSection() {
	return (
		<>
			<div className="relative py-32">
				<div className="flex flex-col items-center justify-center ">
					<h1 className="m-[33.2px_0px_8px] h-[46px] max-w-screen-xl text-center font-semibold text-[40px]  leading-[46px]">
						Features
					</h1>
					<div className="max-w-screen-xl p-[0px_25px] text-center  text-xl tracking-[-0.2px]">
						<p>
							We provide a variety of features to help you create beautiful
							images, cards, Markdown, or JSON from tweets, making sharing
							Twitter posts on other platforms more visual and
							attention-grabbing.
						</p>
					</div>
				</div>

				<div className="m-auto mx-auto mt-[50px] flex max-w-7xl flex-row flex-wrap justify-center overflow-x-hidden ">
					{grid.map((feature) => (
						<div
							key={feature.title}
							className="relative m-4 w-[260px] min-w-[260px] overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-100 to-white p-6 dark:from-neutral-900 dark:to-neutral-950"
						>
							<Grid size={20} />
							<div className="mb-2 p-0">{feature?.icon}</div>
							<p className="relative z-20 font-bold text-base text-neutral-800 dark:text-white">
								{feature.title}
							</p>
							<p className="relative z-20 mt-4 font-normal text-base text-neutral-600 dark:text-neutral-400">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
			{/* <Image src={yellowWaveDown} alt="" className=" -mt-32 absolute" /> */}
		</>
	);
}

const grid = [
	{
		icon: (
			<BookCopy className="w-8 h-8" />
		),
		title: "Fast capture",
		// description:
		// 	"快速将任何帖子转换为卡片,只需要亲亲点击"

		description:
			"Capture and share posts as beautiful images, cards, Markdown, or JSON, making sharing Twitter posts on other platforms more visual and attention-grabbing."
	},
	{
		icon: (
			<Palette className="w-8 h-8" />
		),
		title: "Custom Styles",
		// description:
		// 	"多种卡片风格,自定义颜色，边距等等"

		description:
			"Multiple card styles, custom colors, margins, and more."
	},
	{
		icon: (
			<ListCollapse className="w-8 h-8" />
		),
		title: "Combining multiple posts",
		// description:
		// 	"拼接多个tweet内容，生成长卡片",

		description:
			"Combine multiple tweet contents to generate long cards."
	},
	{
		icon: (
			<LayoutGrid className="w-8 h-8" />
		),
		title: "Dynamic management",
		// description:
		// 	"动态管理你的帖子，随时删除，添加",

		description:
			"Manage your posts dynamically, delete or add them at any time."

	},

];

export const Grid = ({
	pattern,
	size,
}: {
	pattern?: number[][];
	size?: number;
}) => {
	const p = pattern ?? [
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
	];
	return (
		<div className="-ml-20 -mt-2 pointer-events-none absolute top-0 left-1/2 h-full [mask-image:linear-gradient(white,transparent)]">
			<div className="absolute inset-0 bg-gradient-to-r from-zinc-100/30 to-zinc-300/30 opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 dark:to-zinc-900/30">
				<GridPattern
					width={size ?? 20}
					height={size ?? 20}
					x="-12"
					y="4"
					squares={p}
					className="absolute inset-0 h-full w-full fill-black/10 stroke-black/10 mix-blend-overlay dark:fill-white/10 dark:stroke-white/10"
				/>
			</div>
		</div>
	);
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
	const patternId = useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern
					id={patternId}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect
				width="100%"
				height="100%"
				strokeWidth={0}
				fill={`url(#${patternId})`}
			/>
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					<title>noise</title>
					{squares.map(([x, y]: any) => (
						<rect
							strokeWidth="0"
							key={`${x}-${y}`}
							width={width + 1}
							height={height + 1}
							x={x * width}
							y={y * height}
						/>
					))}
				</svg>
			)}
		</svg>
	);
}
