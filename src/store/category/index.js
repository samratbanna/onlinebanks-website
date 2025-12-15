import { create } from "zustand";
import { STATUS } from "../../constants";
import { apis } from "../../services/apis/api";
import { ErrorAlert, SuccessAlert } from "../../utils/Helper";
import { filter, map } from "lodash";

export const useCategoryStore = create((set, get) => ({
    resetStatus: async () => {
        set({
            createPublicLeadStatus: STATUS.NOT_STARTED
        });
    },

    getCategoryAction: async (payload) => {
        if(get().categories) return;
        set({ getCategoryStatus: STATUS.FETCHING });
        const { data, ok } = await apis.getCategoryApi(payload);
        if (ok) {
            set({
                categories: data,
                getCategoryStatus: STATUS.SUCCESS,
            });
        } else {
            set({ getCategoryStatus: STATUS.FAILED });
        }
    },

    getProductAction: async (payload) => {
        if(get().productDetail) return;
        set({ getProductStatus: STATUS.FETCHING });
        const { data, ok } = await apis.getProductApi(payload);
        if (ok) {
            set({
                productDetail: data,
                getProductStatus: STATUS.SUCCESS,
            });
        } else {
            set({ getProductStatus: STATUS.FAILED });
        }
    },

    getAppVersionAction: async (payload) => {
        if(get().appDetail) return;
        set({ getAppVersionStatus: STATUS.FETCHING });
        const { data, ok } = await apis.getAppDetailApi(payload);
        if (ok) {
            set({
                appDetail: data,
                getAppVersionStatus: STATUS.SUCCESS,
            });
        } else {
            set({ getAppVersionStatus: STATUS.FAILED });
        }
    },
    
    getTeamAction: async (payload) => {
        if(get().teamDetail) return;
        set({ getTeamStatus: STATUS.FETCHING });
        const { data, ok } = await apis.getTeamApi(payload);
        if (ok) {
            set({
                teamDetail: data,
                getTeamStatus: STATUS.SUCCESS,
            });
        } else {
            set({ getTeamStatus: STATUS.FAILED });
        }
    },

    createLeadAction: async (payload) => {
        set({ createPublicLeadStatus: STATUS.FETCHING });
        const { data, ok } = await apis.createLeadApi(payload);
        if (ok) {
            set({
                createPublicLeadStatus: STATUS.SUCCESS,
                leadResponse: data
            });
            SuccessAlert("Lead Created Successfully");
        } else {
            set({ createPublicLeadStatus: STATUS.FAILED });
            ErrorAlert((data && data.errorMessage) || "Something Went Wrong");
        }
    },
}))