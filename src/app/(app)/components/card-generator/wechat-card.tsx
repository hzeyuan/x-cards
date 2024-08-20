import type { CardStore, XConfig } from "@src/hooks/useCardStore"

interface WechatCardProps {
    xConfig: XConfig,
    backgroundStyles: CardStore['backgroundStyles'],
    cardStyles: CardStore['cardStyles'],
    fontStyles: CardStore['fontStyles'],
}

export const WeChatCard: React.FC<WechatCardProps> = () => {
    return (
        <div
            name="tempB"
            className="sm:w-full w-[100vw] bg-[#1B1C1E] text-[#E3D2B3] flex flex-col justify-between tempB"
            style={{
                transition: "padding 500ms",
                padding: 30,
                fontFamily: "SourceHanSerifCN_SemiBold",
                minHeight: "auto"
            }}
        >
            <div>
                <div
                    className="n-collapse-transition"
                    style={{ nBezier: "cubic-bezier(.4, 0, .2, 1)" }}
                >
                    <div className="mb-2">
                        <div className="cursor-pointer flex w-max">
                            <input type="file" accept=".jpg, .jpeg, .png" className="hidden" />
                            <img
                                src="/_nuxt/default-avatar.C85jNu88.png"
                                id="icon"
                                className="rounded-[50%]"
                                style={{ width: 40, height: 40 }}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="leading-[1.4] opacity-90 font-bold custom-transition-2 mb-1.5"
                    style={{ fontSize: "calc(1.25rem)" }}
                >
                    <div className="bg-[transparent]">
                        <div contentEditable="true" translate="no" className="editable-element">
                            <p>Space</p>
                        </div>
                    </div>
                </div>
                <div
                    className="leading-[1.5] opacity-90 custom-transition-2 mb-6 mt-2"
                    style={{ fontSize: "calc(0.875rem)" }}
                >
                    <div>
                        <div className="bg-[transparent]">
                            <div
                                contentEditable="true"
                                translate="no"
                                className="editable-element"
                            >
                                <p>摘录于2024/8/18</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    name="showContent"
                    className="content-body custom-transition-2 opacity-90"
                    style={{ fontSize: "calc(1.25rem)" }}
                >
                    <div className="bg-[transparent]">
                        <div
                            contentEditable="true"
                            translate="no"
                            className="editable-element md-class"
                        >
                            <p>
                                人性和商业的能力，这样才能更好地发现市场痛点，了解用户需求，并用商业来完善产品想法，而不是仅仅作为一名员工去实现公司指定的产品路线。很多产品经理的工作多年间都无法得到进一步提升，其实相当一部分人是卡在了商业洞察这一块。于是很多人在问，是不是多读几本书就可以系统训练商业知识和商业嗅觉，从而增强自己的商业洞察能力?
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="mt-6" />
                <div
                    className="color-[#BBBD9E] font-light opacity-70 leading-[1.4] custom-transition-2 mb-1.5"
                    style={{ fontSize: "calc(1rem)" }}
                >
                    <div className="bg-[transparent]">
                        <div contentEditable="true" translate="no" className="editable-element">
                            <p>/产品之旅:产品经理的方法论与实战进阶</p>
                        </div>
                    </div>
                </div>
                <div
                    className="custom-transition-2 mb-1.5 opacity-70"
                    style={{ fontSize: "calc(0.9rem)" }}
                >
                    <div className="bg-[transparent]">
                        <div contentEditable="true" translate="no" className="editable-element">
                            <p>赖京露</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="divider bg-[#F6ECD4] opacity-10 h-px my-5" />
                    <div
                        className="qr-code-section flex items-center justify-between pt-2"
                        style={{ fontFamily: '"Noto Serif SC"' }}
                    >
                        <div>
                            <div
                                className="leading-[1.4] font-bold custom-transition-2"
                                style={{ fontSize: "calc(0.8rem)" }}
                            >
                                <div className="bg-[transparent]">
                                    <div
                                        contentEditable="true"
                                        translate="no"
                                        className="editable-element"
                                    >
                                        <p>微信读书</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#F6E2B5] p-1">
                            <div className="flex" id="qr-code">
                                <div
                                    className="n-qr-code cursor-pointer"
                                    style={{
                                        padding: 0,
                                        backgroundColor: "transparent",
                                        width: 58,
                                        height: 58,
                                        borderRadius: 3
                                    }}
                                >
                                    <canvas
                                        width={116}
                                        height={116}
                                        style={{ width: 58, height: 58 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}