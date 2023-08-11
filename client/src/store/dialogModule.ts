import { Component } from "vue";
import { Plan } from "./plansModule";

interface ModalData {
    plan: Plan | undefined;
    isPlanNew: boolean;
}

export interface dialogState {
    modal: Component | null;
    modalData: ModalData;
}

const modalData: ModalData = {
    plan: undefined,
    isPlanNew: false,
};

export const dialogModule = {
    state: function getState(): dialogState {
        return {
            modal: null,
            modalData,
        };
    },
    mutations: {
        openModal(state: dialogState, plan: Component) {
            state.modal = plan;
        },
        closeModal(state: dialogState) {
            state.modal = null;
            state.modalData = modalData;
        },
        setModalData(state: dialogState, data: ModalData) {
            state.modalData = data;
        },
    },
    namespace: false,
};
