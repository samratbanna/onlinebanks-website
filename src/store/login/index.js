import { create } from "zustand";
import { STATUS } from "../../constants";
import { apis } from "../../services/apis/api";
import { ErrorAlert, SuccessAlert } from "../../utils/Helper";
import { filter, map } from "lodash";

export const useCommissionStore = create((set, get) => ({
    resetStatus: async () => {
        set({
        });
    },

    getCommissionAction: async (payload) => {
        if(get().commissionDetails) return;
        set({ getCommissionStatus: STATUS.FETCHING });
        const { data, ok } = await apis.getCommissionApi(payload);
        if (ok) {
            set({
                commissionDetails: data,
                getCommissionStatus: STATUS.SUCCESS,
            });
        } else {
            set({ getCommissionStatus: STATUS.FAILED });
        }
    },
}));
