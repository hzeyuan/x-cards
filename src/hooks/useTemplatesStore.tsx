import { create } from 'zustand'
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware'
import { get, set, del } from 'idb-keyval' // can use anything: IndexedDB, Ionic Storage, etc.
import { type CardStore } from './useCardStore'



export type Template = Pick<CardStore, 'fontStyles' | 'colorIndex' | 'backgroundStyles' | 'cardStyles' | 'tabConfig'> & {
    name: string;
}


const storage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        return (await get(name)) || null
    },
    setItem: async (name: string, value: string): Promise<void> => {
        await set(name, value)
    },
    removeItem: async (name: string): Promise<void> => {
        await del(name)
    },
}

interface TemplatesStore {
    templates: Template[];
    setTemplates?: (templates: Template[]) => void;
    addTemplate?: (template: Template) => void;
    delTemplate?: (index: number) => void;
}

export const useTemplatesStore = create(
    persist<TemplatesStore>((set, get) => ({
        templates: [],
        setTemplates: (templates) => {
            set({
                templates
            })
        },
        addTemplate: (template) => {
            set({
                templates: [...get().templates, template]
            })
        },
        delTemplate: (index) => {
            set({
                templates: get().templates.filter((_, i) => i !== index)
            })
        }
    }), {
        name: 'templates',
        storage: createJSONStorage(() => storage),
        partialize: (state) => ({
            templates: state.templates
        })
    })
)