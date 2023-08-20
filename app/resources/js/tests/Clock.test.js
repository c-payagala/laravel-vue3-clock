import { mount } from "@vue/test-utils";
import Clock from "../Components/Clock.vue";

import axios from 'axios'
import moment from "moment";
vi.mock('axios')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

test ("sanity check", () => {
    expect(1).toBe(1);
});

test ("clock component is displayed", () => {
    const settingsMock = {
        data: {
            clock_offset: 0,
        }
    }

    axios.get.mockResolvedValue({
        data: settingsMock,
    });

    const wrapper = mount(Clock);
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

    const wrapper = await mount(Clock);
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
    await wrapper.find('#plus-seconds').trigger('click');
    await sleep(1000);
    date = moment().add(2, 'seconds');
    expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));

    await wrapper.find('#minus-seconds').trigger('click');
    await sleep(1000);
    date = moment().add(1, 'seconds');
    expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));
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
    await sleep(1000);
    date = moment().add(60, 'seconds');
    expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));

    await wrapper.find('#minus-minutes').trigger('click');
    await sleep(1000);
    date = moment().add(0, 'seconds');
    expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));
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
    await sleep(1000);
    date = moment().add(1, 'hours');
    expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));

    await wrapper.find('#minus-hours').trigger('click');
    await wrapper.find('#minus-hours').trigger('click');
    await sleep(1000);
    date = moment().add(-1, 'hours');
    expect(wrapper.vm.time.format('HH:mm:ss')).toBe(date.format('HH:mm:ss'));
});
