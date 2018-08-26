interface InnerAudioContext {
}

declare class WX {
  getShareInfo(): VoidFunction;
  login(): VoidFunction;
  checkSession(): VoidFunction;
  getStorageSync(): string;
  setStorageSync(): VoidFunction;
  getSetting(): VoidFunction;
  getUserInfo(): VoidFunction;
  navigateTo(options: { url: string, success: VoidFunction, fail: VoidFunction, complete: VoidFunction }): VoidFunction;
  switchTab(options: { url: string, success: VoidFunction, fail: VoidFunction, complete: VoidFunction }): VoidFunction;
  /***/
  redirectTo(options: { url: string, success: VoidFunction, fail: VoidFunction, complete: VoidFunction }): VoidFunction;
  navigateBack(options: { delta: number }): VoidFunction;
  getRecorderManager(): RecorderManager;
  createInnerAudioContext(): InnerAudioContext;
  showModal({
              title: string,
              content: string,
              showCancel: boolean,
              cancelText: string,
              cancelColor: string,
              confirmText: string,
              confirmColor: string,
              success: (res: { confirm: boolean, cancel: boolean }) => VoidFunction,
              fail: VoidFunction,
              complete: VoidFunction
            }): VoidFunction;
  showToast(options: {
    title: string,
    icon: 'success' | 'loading' | 'none',
    image: string,
    duration: number,
    mask: boolean,
    success: VoidFunction,
    fail: VoidFunction,
    complete: VoidFunction
  }): VoidFunction;
  hideToast(): VoidFunction;
  showLoading({
                title: string,
                mask: boolean,
                success: VoidFunction,
                fail: VoidFunction,
                complete: VoidFunction
              }): VoidFunction;
  hideLoading(): VoidFunction;
  showActionSheet(options: {
    itemList: Array<string>,
    itemColor: string,
    success: VoidFunction,
    fail: VoidFunction,
    complete: VoidFunction
  }): VoidFunction;
  getSystemInfo({
                  success: (res: SystemInfo) => VoidFunction,
                  fail: VoidFunction,
                  complete: VoidFunction,
                }): VoidFunction;
  getSystemInfoSync(): SystemInfo;
  canIUse(name: string): boolean;
  saveFile({
             tempFilePath: string,
             success: VoidFunction,
             fail: VoidFunction,
             complete: VoidFunction,
           }): VoidFunction;
  uploadFile(options: {
    url: string,
    filePath: string,
    name: string,
    header: {},
    formData: {},
    success: VoidFunction,
    fail: VoidFunction,
    complete: VoidFunction,
  }): void;
  downloadFile(options: {
    url: string,
    header: {},
    success: VoidFunction,
    fail: VoidFunction,
    complete: VoidFunction,
  }): void;
  setStorage(options: {
    key: string,
    data: string | {},
    success: VoidFunction,
    fail: VoidFunction,
    complete: VoidFunction,
  }): void;
  setStorageSync(key: string, data: string | {}): void;
  stopPullDownRefresh(): void;
}

declare class SystemInfo {
  brand: string,
  model: string,
  pixelRatio: number,
  screenWidth: number,
  screenHeight: number,
  windowWidth: number,
  windowHeight: number,
  statusBarHeight: number,
  language: string,
  version: string,
  system: string,
  platform: string,
  fontSizeSetting: number,
  SDKVersion: string,

}

declare class RecorderManager {
  start(options: {}): void;
  pause(): void;
  resume(): void;
  stop(): void;

  onStart(): VoidFunction;
  onPause(): VoidFunction;
  onStop(): VoidFunction;
  onFrameRecorded(): VoidFunction;
  onError(): VoidFunction;
}

declare var wx: WX;

declare class Application {

}

declare function App(a: number): Application;

declare function getApp(): Application;
declare function Page(options: { data: {} }): string;

declare var module: { exports: { default: {} } };
