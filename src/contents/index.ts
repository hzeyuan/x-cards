import { sendToBackground } from "@plasmohq/messaging"
import type { PlasmoCSConfig } from "plasmo"


export const config: PlasmoCSConfig = {
    matches: ["https://x.com/*"],
    all_frames: false,
    run_at: "document_end",
    world: "MAIN"
}


