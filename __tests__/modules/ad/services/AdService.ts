import {adService} from "../../../../src/modules/ad/services";

beforeAll(() => {
    jest.mock('@react-native-community/async-storage');
});

test('renders correctly', async () => {
    await adService.remove();
    expect(adService.needShow()).toEqual(false);
    await new Promise(resolve => setTimeout(resolve, 6 * 1000));
    expect(adService.needShow()).toEqual(true);
});
