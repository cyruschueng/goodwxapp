import promisify from './promisify'

const wxGetShareInfo = promisify(wx.getShareInfo)

/**
 * 获取分享加密信息
 * @param {string} ticket - 用户得到的 shareTicket
 * @return {Promise<{ encryptedData: string, iv: string }>}
 */
function getInfo(ticket) {
    return wxGetShareInfo({
        shareTicket: ticket
    })
}

export default {
    getInfo
}
