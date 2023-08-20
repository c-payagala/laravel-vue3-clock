import { mount } from "@vue/test-utils";
import Clock from "../Components/Clock.vue";

import axios from 'axios'
import moment from "moment";
vi.mock('axios');

import { createTestingPinia } from '@pinia/testing';
import {createApp, nextTick} from "vue";
import {createPinia, setActivePinia} from "pinia";


const options = {
    global: {
        plugins: [createTestingPinia({
            userSetting: {
                clock_offset: 60
            },
            errors: '',
        })],
    },
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


describe ('Clock', () => {
   beforeEach(() => {
       const app = createApp('#app');
       const pinia = createPinia();
       app.use(pinia);
       setActivePinia(pinia);
   });

    test ("sanity check", () => {
        expect(1).toBe(1);
    });

    test ("clock component is displayed", async () => {
        const settingsMock = {
            data: {
                clock_offset: 0,
            }
        }

        axios.get.mockResolvedValue({
            data: settingsMock,
        });

        const wrapper = await mount(Clock);
        expect(wrapper.html()).toContain("Current Time Offset");
        expect(wrapper.html()).toContain("00:00:00");
    });

    test ("clock component is using correct offset received from api", async () => {
        const settingsMock = {
            data: {
                clock_offset: 60,
            }
        }

        axios.get.mockResolvedValue({
            data: settingsMock,
        });

        const wrapper =  await mount(Clock);
        expect(wrapper.html()).toContain("Current Time Offset");

        await sleep(1000);
        expect(wrapper.vm.userSetting.clock_offset).toBe(60);

        const date = moment().add(60, 'seconds');
        expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));
    });

    test ("clock component offset reset test", async () => {

        axios.get.mockResolvedValue({
            data: {
                data: {
                    clock_offset: 60,
                }
            },
        });

        axios.post.mockResolvedValue({
            data: {
                data: {
                    clock_offset: 0,
                }
            },
        });

        const wrapper = await mount(Clock);

        await sleep(1000);

        const date = moment().add(60, 'seconds');
        expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));

        await wrapper.find('#reset').trigger('click');
        await sleep(1000);
        const date2 = moment();
        expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date2.format('HH:mm:ss'));
    });

    test ("check seconds increment and decrement ", async () => {

        axios.get.mockResolvedValue({
            data: {
                data: {
                    clock_offset: 0,
                }
            },
        });

        const wrapper = await mount(Clock);

        await sleep(1000);

        let date = null;

        date = moment().add(0, 'seconds');
        expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));

        await wrapper.find('#plus-seconds').trigger('click');
        expect(wrapper.vm.userSetting.clock_offset).toBe(1);

        await wrapper.find('#minus-seconds').trigger('click');
        expect(wrapper.vm.userSetting.clock_offset).toBe(0);
    });

    test ("check minute increment and decrement ", async () => {

        axios.get.mockResolvedValue({
            data: {
                data: {
                    clock_offset: 0,
                }
            },
        });

        const wrapper = await mount(Clock);

        await sleep(1000);

        let date = null;

        date = moment().add(0, 'seconds');
        expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));

        await wrapper.find('#plus-minutes').trigger('click');
        expect(wrapper.vm.userSetting.clock_offset).toBe(60);

        await wrapper.find('#minus-minutes').trigger('click');
        expect(wrapper.vm.userSetting.clock_offset).toBe(0);
    });

    test ("check hour increment and decrement ", async () => {

        axios.get.mockResolvedValue({
            data: {
                data: {
                    clock_offset: 0,
                }
            },
        });

        const wrapper = await mount(Clock);

        await sleep(1000);

        let date = null;

        date = moment().add(0, 'seconds');
        expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));

        await wrapper.find('#plus-hours').trigger('click');
        expect(wrapper.vm.userSetting.clock_offset).toBe(60*60);

        await wrapper.find('#minus-hours').trigger('click');
        expect(wrapper.vm.userSetting.clock_offset).toBe(0);
    });

});
