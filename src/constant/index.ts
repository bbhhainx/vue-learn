export const PRINT_FORM_DEFAULT1 = `<table class="table table-bprintLabeled" style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td>{PAGE_NAME}<br />http://facebook.com/{PAGE_USERNAME}</td>
<td>Đơn h&agrave;ng <strong>#{ORDER_ID}</strong><br />Ng&agrave;y tạo:&nbsp;{ORDER_CREATED_DAY}</td>
</tr>
<tr>
<td colspan="2">Người nhận: <strong>{SHIPPING_NAME}</strong><br />
<div style="width: 100%;">
<div style="margin-left: 80px;">
<p style="margin: 0px 0px 0px 0px;">{SHIPPING_ADDRESS}</p>
</div>
</div>
<div style="margin-left: 80px;">{SHIPPING_PHONE}</div>
</td>
</tr>
<tr>
<td colspan="2">{FULL_PRODUCTS}</td>
</tr>
<tr>
<td>{NOTE}</td>
<td>Thu hộ (COD): {TOTAL_COD}</td>
</tr>
</tbody>
</table>`;

export const PRINT_FORM_DEFAULT2 = `<table class="table table-bprintLabeled fr-bold-border" style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="width: 49.8798%;">
<div style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;">Dịch vụ</span></div>
<div style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;">Chuyển ph&aacute;t nhanh</span></div>
</td>
<td style="width: 50.0496%;">
<div style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;">Tỉnh ph&aacute;t</span></div>
<div style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;"><strong><span style="font-size: 18px;">{SHIPPING_PROVINCE}</span></strong> </span></div>
</td>
</tr>
<tr>
<td style="width: 100.226%;" colspan="2">
<div><span style="font-family: Arial,Helvetica,sans-serif;">T.lượng (Gr): <strong><span style="font-size: 18px;">{TOTAL_WEIGHT}&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></strong><span style="font-size: 18px;">Ng&agrave;y gửi: ...../...../......</span></span></div>
</td>
</tr>
<tr>
<td style="width: 100.226%;" colspan="2">
<div style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;"><strong>{ORDER_ID_BARCODE}</strong></span></div>
</td>
</tr>
<tr>
<td style="width: 99.9294%;" colspan="2"><span style="font-family: Arial,Helvetica,sans-serif;"><strong><span style="text-transform: uppercase;">Người gửi</span>: {WAREHOUSE_NAME}</strong><br /><strong><span style="text-transform: uppercase;">Điện thoại</span>: {WAREHOUSE_PHONE_NUMBER}</strong><br /><span style="text-transform: uppercase;">Địa chỉ</span>: {WAREHOUSE_ADDRESS}</span></td>
</tr>
<tr>
<td style="width: 99.9294%;" colspan="2"><span style="font-family: Arial,Helvetica,sans-serif;"><strong>Tiền thu hộ:</strong> <span style="font-size: 24px;">{TOTAL_COD}&nbsp;</span> <br /><strong><span style="text-transform: uppercase;">Nội dung</span>:&nbsp;</strong>{SHORT_PRODUCTS} <br /><strong>{NOTE}</strong> <br /><strong>Gi&aacute; trị h&agrave;ng:</strong> {TOTAL}</span></td>
</tr>
<tr>
<td style="width: 99.9294%;" colspan="2"><span style="font-family: Arial,Helvetica,sans-serif;"><strong><span style="text-transform: uppercase;">Người nhận</span>: {SHIPPING_OR_BILL_NAME}</strong><br /><strong><span style="text-transform: uppercase;">Địa chỉ</span>: {SHIPPING_ADDRESS}</strong><br /><strong><span style="text-transform: uppercase;">Điện thoại</span>: <span style="font-size: 18px;">{SHIPPING_OR_BILL_PHONE}</span></strong> </span></td>
</tr>
<tr>
<td style="text-align: center;">
<div style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;">Chữ k&yacute; bưu t&aacute; (BC)</span></div>
<p><span style="font-family: Arial,Helvetica,sans-serif;">&nbsp;</span></p>
<p><span style="font-family: Arial,Helvetica,sans-serif;">&nbsp;</span></p>
<p><span style="font-family: Arial,Helvetica,sans-serif;">&nbsp;</span></p>
</td>
<td>
<div style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;">Chữ k&yacute; người nhận</span></div>
<p><span style="font-family: Arial,Helvetica,sans-serif;">&nbsp;</span></p>
<p><span style="font-family: Arial,Helvetica,sans-serif;">&nbsp;</span></p>
<p><span style="font-family: Arial,Helvetica,sans-serif;">&nbsp;</span></p>
</td>
</tr>
<tr>
<td style="width: 99.9294%;" colspan="2"><span style="font-family: Arial,Helvetica,sans-serif;"><strong><span style="font-size: 24px; text-transform: uppercase;">Phiếu gửi</span></strong> </span></td>
</tr>
</tbody>
</table>`

export const PRINT_FORM_DEFAULT3 = `<p style="text-align: center;"><span style="font-family: Arial, Helvetica, sans-serif;"><strong>T&ecirc;n shop - Slogan</strong></span></p>
<p style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;">Địa chỉ: 20A Thanh Xu&acirc;n, H&agrave; Nội</span></p>
<p style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;">Hotline: 0986868686</span></p>
<p style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif; text-transform: uppercase;"><strong>Đơn h&agrave;ng</strong></span></p>
<table class="fr-hide-border" style="width: 100%;">
<tbody>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;"><span style="font-size: 14px;">Số: {ORDER_ID}</span></span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;"><span style="font-size: 12px;">Ng&agrave;y: {ORDER_CREATED_DAY}</span></span></div>
</td>
</tr>
</tbody>
</table>
<p><span style="font-family: Arial,Helvetica,sans-serif;">Kh&aacute;ch h&agrave;ng: {SHIPPING_OR_BILL_NAME}</span></p>
<p><span style="font-family: Arial,Helvetica,sans-serif;">Địa chỉ: {SHIPPING_ADDRESS}</span></p>
<p><span style="font-family: Arial,Helvetica,sans-serif;">SĐT: {SHIPPING_OR_BILL_PHONE}</span></p>
<table style="width: 100%;">
<tbody>
<tr>
<td style="width: 100.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;">{FULL_PRODUCTS_2}</span></td>
</tr>
</tbody>
</table>
<table class="fr-hide-border" style="width: 100%;">
<tbody>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;">Tổng số lượng:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;">{TOTAL_PRODUCT_QUANTITY}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;">Tổng tiền h&agrave;ng:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;">{TOTAL_PRICE}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;">Chiết khấu:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif;">{DISCOUNT}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;">Ph&iacute; vận chuyển:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;">{SHIPPING_FEE}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif; font-weight: bold;">Kh&aacute;ch phải trả:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif; font-weight: bold;">{TOTAL_COD}</span></div>
</td>
</tr>
<tr>
<td><span style="font-family: Arial,Helvetica,sans-serif;">Số điểm t&iacute;ch:</span></td>
<td>
<div style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif;">{AWARDED_POINT}</span></div>
</td>
</tr>
<tr>
<td><span style="font-family: Arial,Helvetica,sans-serif;">Ghi ch&uacute;:</span></td>
<td>
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;">{NOTE}<br /></span></div>
</td>
</tr>
</tbody>
</table>`

export const PRINT_FORM_DEFAULT4 = `<span style="font-size: 12px;"> {ORDER_CREATED_DAY} <span style="margin-left: 35%;">Giao dịch - H&oacute;a đơn</span> </span>
<p style="font-weight: bold; text-align: center; margin-top: 10px;">{ORDER_SOURCE}</p>
<p style="text-align: center;">Địa chỉ: {WAREHOUSE_ADDRESS}</p>
<p style="text-align: center;">Điện thoại: {WAREHOUSE_PHONE_NUMBER}</p>
<p style="text-align: center; font-weight: bold; margin-top: 10px;">H&oacute;a đơn b&aacute;n h&agrave;ng</p>
<p style="text-align: center;">Số HD: {FULL_ORDER_ID}</p>
<p style="text-align: center;">Ng&agrave;y: {ORDER_CREATED_DAY}</p>
<p style="margin-top: 5px;">Kh&aacute;ch h&agrave;ng: {SHIPPING_NAME}</p>
<p>Điện thoại: {SHIPPING_OR_BILL_PHONE}</p>
<p>Địa chỉ: {SHIPPING_ADDRESS}</p>
<table style="width: 100%; margin-top: 10px;">
<tbody>
<tr>
<td style="width: 100.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;">{FULL_PRODUCTS_2}</span></td>
</tr>
</tbody>
</table>
<table class="fr-hide-border" style="width: 50%; margin-top: 10px; margin-left: 50%;">
<tbody>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;">Tổng tiền h&agrave;ng:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;">{TOTAL_PRICE}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;">Chiết khấu:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif;">{DISCOUNT}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;">Ph&iacute; vận chuyển:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;">{SHIPPING_FEE}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif; font-weight: bold;">Tổng thanh to&aacute;n:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif; font-weight: bold;">{TOTAL_COD}</span></div>
</td>
</tr>
</tbody>
</table>
<p style="margin-left: 1px;">({TOTAL_COD_TEXT} đồng)</p>
<p style="text-align: center; margin-top: 15px;">Cảm ơn v&agrave; hẹn gặp lại!</p>`

export const RETURN_FORM = `<div class="exchange-order-label" style="border: solid 1px #000;">
<div class="exchange-order-label" style="border: solid 1px #000;">
<div>
<div class="title" style="text-transform: uppercase; font-size: 20px; font-weight: bold; text-align: center;">Phiếu đổi trả h&agrave;ng</div>
<div style="margin-top: 20px; font-family: fantasy; font-size: 14px; text-align: center;">T&ecirc;n shop: Thời trang nam - nữ</div>
<table class="table-exchange-order" style="width: 100%;">
<tbody>
<tr>
<td class="customer" style="width: 70%; text-align: left; border-right: 1px dashed #d9d9d9; border-top: 1px dashed #d9d9d9;"><span style="font-size: 11px; font-weight: bold;">T&ecirc;n kh&aacute;ch h&agrave;ng: <span style="font-size: 12px; font-weight: bold;">{SHIPPING_NAME}</span></span><br /><span style="font-size: 11px; font-weight: bold;">Địa chỉ: {SHIPPING_ADDRESS}</span></td>
<td class="address" style="border-top: 1px dashed #d9d9d9;"><span style="font-size: 11px; font-weight: bold;">SĐT: {SHIPPING_OR_BILL_PHONE}</span><br /><span style="font-size: 11px; font-weight: bold;">M&atilde; đơn h&agrave;ng: {ORDER_ID}</span></td>
</tr>
<tr style="height: 30px;">
<td class="order-info" style="width: 100%; border-top: 1px dashed #d9d9d9;" colspan="2">
<div class="print_barcode">
<div style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;"><strong>Th&ocirc;ng tin đơn h&agrave;ng</strong></span></div>
</div>
</td>
</tr>
</tbody>
</table>
<div style="margin-top: 10px; font-size: 11px; border: solid 1px rgba(0, 0, 0, 0.45);">{FULL_PRODUCTS_ORDER_EXCHANGE}</div>
</div>
<div class="order-price" style="margin-top: 10px; width: 100%; font-size: 11px;">
<table style="width: 100%;">
<tbody>
<tr style="border: 1px dashed #d9d9d9;">
<td class="td-left" style="width: 70%; text-align: left;">Tổng tiền đơn cũ:</td>
<td class="td-right" style="width: 30%; text-align: right;">{TOTAL_COD_OLD_ORDER}</td>
</tr>
<tr style="border: 1px dashed #d9d9d9;">
<td class="td-left" style="width: 70%; text-align: left;">Tổng tiền đơn mới:</td>
<td class="td-right" style="width: 30%; text-align: right;">{TOTAL_COD}</td>
</tr>
<tr style="border: 1px dashed #d9d9d9;">
<td class="td-left" style="width: 70%; text-align: left;">Gi&aacute; ch&ecirc;nh lệch:</td>
<td class="td-right" style="width: 30%; text-align: right;">{TOTAL_COD_DIFFERENCE}</td>
</tr>
</tbody>
</table>
</div>
<div style="margin-top: 10px; width: 100%; font-size: 11px; display: flex;">
<div style="width: 80%;">&nbsp;</div>
<div style="width: 20%; text-align: center;">K&yacute;, họ t&ecirc;n</div>
</div>
<div style="margin-top: 20px; width: 100%;">&nbsp;</div>
</div>
</div>
<style type="text/css">
.fr-view table tr, .fr-view table td {
  border: unset;
  border-right: 1px dashed #d9d9d9;
}
.fr-view table {
  width: 100%;
}
</style>`

export const OFFLINE_FORM = `<p style="text-align: center;"><span style="font-family: Arial, Helvetica, sans-serif;"><strong>Shop - Slogan</strong></span></p>
<p style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;">0964999999</span></p>
<div style="border-bottom: 1px dashed #000; height: 1px;">&nbsp;</div>
<p style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif; text-transform: uppercase;"><strong>H&oacute;a đơn b&aacute;n h&agrave;ng</strong></span></p>
<table class="fr-hide-border" style="width: 100%;">
<tbody>
<tr>
<td style="width: 50.0000%; text-align: left;"><span style="font-family: Arial,Helvetica,sans-serif;"><span style="font-size: 14px;">Số: {ORDER_ID}</span></span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;"><span style="font-size: 14px;">Ng&agrave;y: {ORDER_CREATED_DAY}</span></span></div>
</td>
</tr>
</tbody>
</table>
<div style="border-bottom: 1px solid #000; margin-bottom: 3px; height: 1px;">&nbsp;</div>
<p style="text-align: left;"><span style="font-family: Arial,Helvetica,sans-serif;">Kh&aacute;ch h&agrave;ng: <strong>{SHIPPING_OR_BILL_NAME}</strong></span></p>
<p style="text-align: left;"><span style="font-family: Arial,Helvetica,sans-serif;">Điện thoại: <strong>{SHIPPING_OR_BILL_PHONE}</strong></span></p>
<p style="text-align: left;"><span style="font-family: Arial,Helvetica,sans-serif;">Địa chỉ: <strong>{SHIPPING_ADDRESS}</strong></span></p>
<div style="border-bottom: 1px dashed #000; margin-top: 6px; height: 1px;">&nbsp;</div>
<table style="width: 100%;">
<tbody>
<tr>
<td style="width: 100.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;">{PRODUCTS_RECEIVE_AT_SHOP}</span></td>
</tr>
</tbody>
</table>
<table class="fr-hide-border" style="width: 100%;">
<tbody>
<tr>
<td style="width: 50.0000%; text-align: left;"><span style="font-family: Arial,Helvetica,sans-serif;">Cộng tiền h&agrave;ng:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;">{TOTAL_PRICE}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%; text-align: left;"><span style="font-family: Arial,Helvetica,sans-serif;">Chiết khấu:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;">{DISCOUNT}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%; text-align: left;"><span style="font-family: Arial,Helvetica,sans-serif; font-weight: bold;">Kh&aacute;ch phải trả:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif; font-weight: bold;">{TOTAL_COD}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%; text-align: left;"><span style="font-family: Arial,Helvetica,sans-serif;">Tiền kh&aacute;ch đưa:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;">{CASH}</span></div>
</td>
</tr>
<tr>
<td style="width: 50.0000%; text-align: left;"><span style="font-family: Arial,Helvetica,sans-serif;">Trả lại:</span></td>
<td style="width: 50.0000%;">
<div style="text-align: right;" data-empty="true"><span style="font-family: Arial,Helvetica,sans-serif;">{RETURN_MONEY}</span></div>
</td>
</tr>
</tbody>
</table>
<p style="text-align: center; margin-top: 15px;">Cảm ơn qu&yacute; kh&aacute;ch. Hẹn gặp lại!</p>`

export const GHTK_A5_LANDSCAPE = `<style>
      .border-bottom {
        border-bottom: 1px solid #282828;
      }
      .border-right {
        border-right: 1px solid #282828;
      }

      @page {
        size: A6;
        margin: 0;
      }
    </style>
<div style="font-family: times new roman, times;">
<div style="display: flex; border-bottom: 2px solid #171717;">
<div style="flex: 1;"><img style="width: 175px;" src="https://statics.pancake.vn/user-content.pancake.vn/2023/8/3/678cea3c39ed1e5134ebb14e042252f4886dc10a.png" /></div>
<div style="flex: 2; padding-left: 10px; display: flex;"><img style="width: 190px; object-fit: contain;" src="https://statics.pancake.vn/user-content.pancake.vn/2023/8/3/649088447c775da0f87a62664d0646058552faa7.png" />
<div style="display: flex; align-items: end; padding-bottom: 7px;">Ng&agrave;y tạo: {SHIPPING_DATE_GHTK}</div>
</div>
</div>
<div class="border-bottom" style="display: flex;">
<div class="border-right" style="flex: 2; padding: 10px; display: flex; justify-content: center; align-items: center;">{PARTNER_ID_BARCODE}</div>
<div style="flex: 1; display: flex; justify-content: center; align-items: center; font-size: 27px;">{GHTK_MA_MIEN}</div>
</div>
<div style="display: flex;">
<div class="border-right" style="flex: 1; padding: 10px;">
<div>Người gửi: {SHOP_ID_GHTK} - {WAREHOUSE_NAME} / {a}</div>
<div style="font-weight: 550;">Đ/c: {WAREHOUSE_ADDRESS}</div>
</div>
<div class="border-right" style="flex: 1; padding: 10px;">
<div>Khối lượng</div>
<div style="font-weight: 550;">{TOTAL_WEIGHT}</div>
</div>
<div style="flex: 1; padding: 10px 0px 10px 10px;">
<div>Kho lấy</div>
<div style="font-weight: 550;">{WAREHOUSE_PICK_GHTK}</div>
</div>
</div>
<div class="border-bottom" style="display: flex;">
<div class="border-right" style="flex: 1; padding: 10px;">
<div>Người nhận: {SHIPPING_NAME} / {a}</div>
<div style="font-weight: 550;">Đ/c: {SHIPPING_ADDRESS}</div>
</div>
<div class="border-right" style="flex: 1; padding: 10px;">
<div>Thu hộ</div>
<div style="font-weight: 550;">{TOTAL_COD}</div>
</div>
<div style="flex: 1; padding: 10px 0px 10px 10px;">
<div>Kho giao</div>
<div style="font-weight: 550;">{SHIPPING_DISTRICT}</div>
</div>
</div>
<div style="display: flex; border-bottom: 2px solid #171717;">
<div class="border-right" style="flex: 2; padding: 10px;">
<div style="padding: 10px;">
<div>M&atilde; đơn KH</div>
<div style="font-weight: 550;">{FULL_ORDER_ID}</div>
<div style="background-color: #282828; height: 1px; width: calc(100% + 40px); margin-left: -20px; margin-top: 10px;">&nbsp;</div>
</div>
<div style="display: flex;">
<div style="flex: 1; padding: 10px 0px 10px 10px; display: flex; justify-content: space-between;">{SHORT_PRODUCTS_7}
<div style="height: calc(100% + 40px); width: 1px; background: #282828; margin-right: -5px; margin-top: -20px; margin-bottom: -20px;">&nbsp;</div>
</div>
<div style="flex: 1; padding: 10px;">
<div>Ghi ch&uacute;:</div>
<div style="margin-top: 10px;">{ORDER_NOTE_GHTK}</div>
</div>
</div>
</div>
<div style="flex: 1; display: flex; align-items: center; justify-content: center;">{QR_CODE_GHTK}</div>
</div>
<div style="display: flex; justify-content: space-between; padding: 10px; font-size: 12px;">
<div style="display: flex; align-items: center;">Tai app iGHTK - theo d&ouml;i DH chi 1 cham!</div>
<div>
<div>Giao Hang Tiet Kiem JSC | D&auml;ng ky dich vu: https://kh.ghtk.vn</div>
<div>G&uuml;i y&ecirc;u c&acirc;u/ Chat tai ghtk.vn ho&auml;c tr&ecirc;n App Giaohangtietkiem-Nhanh&amp;R&eacute; cho iOS &amp; Android</div>
</div>
</div>
</div>`

export const GHTK_A5_PORTRAIT = `<style>
      .border-bottom {
        border-bottom: 2px solid #171717;
      }
      .border-right {
        border-right: 2px solid #171717;
      }

      @page {
        size: A6;
        margin: 0;
      }
    </style>
<div style="font-family: times new roman, times;">
<div class="border-bottom" style="display: flex;">
<div style="flex: 1;"><img style="width: 175px;" src="https://statics.pancake.vn/user-content.pancake.vn/2023/8/3/678cea3c39ed1e5134ebb14e042252f4886dc10a.png" /></div>
<div style="flex: 2; padding-left: 10px;"><img style="width: 190px;" src="https://statics.pancake.vn/user-content.pancake.vn/2023/8/3/649088447c775da0f87a62664d0646058552faa7.png" />
<div>Ng&agrave;y tạo: {SHIPPING_DATE_GHTK}</div>
</div>
</div>
<div class="border-bottom" style="display: flex; padding: 10px;">
<div style="flex: 1; border-right: 1px solid #171717;">
<div>
<div>Người gửi: {SHOP_ID_GHTK} - {WAREHOUSE_NAME} / {WAREHOUSE_PHONE_NUMBER_HIDE}</div>
<div style="font-weight: 550;">Đ/c: {WAREHOUSE_ADDRESS}</div>
</div>
<div style="margin-top: 10px;">
<div>Người nhận: {SHIPPING_NAME} / {BUYER_PHONE_NUMBER_HIDE}</div>
<div style="font-weight: 550;">Đ/c: {SHIPPING_ADDRESS}</div>
</div>
</div>
<div style="flex: 1; display: flex; align-items: center; justify-content: center; font-size: 27px; font-weight: 550;">{GHTK_MA_MIEN}</div>
</div>
<div class="border-bottom" style="padding: 5px 0px; text-align: center;">{PARTNER_ID_BARCODE}</div>
<div class="border-bottom" style="display: flex;">
<div style="width: 70%;">
<div style="border-bottom: 2px solid #242424;">
<div style="padding: 10px;">
<div>M&atilde; đơn KH</div>
<div style="font-weight: 550;">{FULL_ORDER_ID}</div>
</div>
</div>
<div>
<div style="padding: 10px;">
<div style="display: flex;">
<div style="width: 70%;">
<div>Kho lấy</div>
<div style="font-weight: 550;">{WAREHOUSE_PICK_GHTK}</div>
</div>
<div style="width: 30%;">
<div>Khối lượng</div>
<div style="font-weight: 550;">{TOTAL_WEIGHT}</div>
</div>
</div>
<div style="display: flex; margin-top: 15px;">
<div style="width: 70%;">
<div>Kho giao</div>
<div style="font-weight: 550;">{SHIPPING_DISTRICT}</div>
</div>
<div style="width: 30%;">
<div>Thu hộ</div>
<div style="font-weight: 550;">{TOTAL_COD}</div>
</div>
</div>
</div>
</div>
</div>
<div style="width: 30%; display: flex; align-items: center; justify-content: center;">{QR_CODE_GHTK}</div>
</div>
<div class="border-bottom" style="display: flex; padding: 10px;">
<div style="flex: 1; border-right: 1px solid #171717;">{SHORT_PRODUCTS_7}</div>
<div style="flex: 1; padding-left: 10px;">
<div>Ghi ch&uacute;:</div>
<div style="margin-top: 10px;">{ORDER_NOTE_GHTK}</div>
</div>
</div>
<div class="border-bottom" style="padding: 10px; font-size: 12px;">
<div>Tai app iGHTK - theo d&ouml;i DH chi 1 cham!</div>
<div>Giao Hang Tiet Kiem JSC | D&auml;ng ky dich vu: https://kh.ghtk.vn</div>
<div>G&uuml;i y&ecirc;u c&acirc;u/ Chat tai ghtk.vn ho&auml;c tr&ecirc;n App Giaohangtietkiem-Nhanh&amp;R&eacute; cho iOS &amp; Android</div>
</div>
</div>`

export const GHN_A5 = `<div class="ghn-a5-label">
<div class="ghn-a5-label">&nbsp;</div>
</div>
<style type="text/css">
        .center {
          text-align: center !important;
        }
        .bold {
          font-weight: bold !important;
        }
        .section {
          text-align: start;
          vertical-align: top;
          padding: 5px;
          border: 1px solid #000;
          border-radius: 8px;
          padding: 5px;
          font-size: 16px;
          font-family: Arial,Helvetica,sans-serif;
        }
      </style>
<div class="ghn-a5-label">
<div class="section" style="margin-bottom: 5px;">
<div>B&ecirc;n gửi</div>
<div class="bold">{WAREHOUSE_NAME} - {WAREHOUSE_PHONE_NUMBER}</div>
<div class="bold">{WAREHOUSE_ADDRESS}</div>
</div>
<div class="section" style="margin-bottom: 5px;">
<div>B&ecirc;n nhận</div>
<div class="bold">{SHIPPING_NAME} - {SHIPPING_PHONE}</div>
<div class="bold">{SHIPPING_ADDRESS}</div>
</div>
<div class="section" style="margin-bottom: 5px; border: none;">
<div style="font-size: 30px;">{PARTNER_ID_BARCODE}</div>
<div style="display: flex; justify-content: space-between;">
<div style="font-size: 50px;">{SORT_CODE_GHN}</div>
<div style="font-size: 30px;">{QR_CODE_EXTEND_CODE}</div>
</div>
<div>{SHIPPING_COMMUNE}, {SHIPPING_DISTRICT}</div>
</div>
<div class="section" style="padding: 0;">
<div style="text-align: center; border-bottom: 1px solid #000;">Ghi ch&uacute; kh&aacute;ch h&agrave;ng</div>
<div style="text-align: center; border-bottom: 1px solid #000;">{NOTE_GHN}</div>
<div style="padding: 5px;">{FULL_PRODUCTS_COMBO}</div>
<div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 5px;">
<div>K&iacute; t&ecirc;n</div>
<div>X&aacute;c nhận h&agrave;ng nguy&ecirc;n vẹn</div>
<div align="center">
<div><img src="../../../static/img/print_logo_ghn_3.png" width="80px" /></div>
</div>
<div>1/1</div>
</div>
</div>
</div>`

export const GHN_80x80 = `<div class="ghn-80x80-label">
<div class="ghn-80x80-label">&nbsp;</div>
</div>
<style type="text/css">
        .center {
          text-align: center !important;
        }
        .bold {
          font-weight: bold !important;
        }
        .section {
          text-align: start;
          vertical-align: top;
          font-size: 12px;
          font-family: Arial,Helvetica,sans-serif;
        }
      </style>
<div class="ghn-80x80-label">
<div style="display: flex;">
<div class="section" style="flex: 1; padding-right: 10px;">
<div class="bold">{WAREHOUSE_NAME} - {WAREHOUSE_PHONE_NUMBER}</div>
</div>
<div class="section" style="flex: 2; border-left: 1px dotted #000; padding-left: 10px;">
<div class="bold" style="display: flex; align-item: center; justify-content: space-between;">
<div>{SHIPPING_NAME}</div>
<div>{SHIPPING_PHONE}</div>
</div>
<div class="bold">{SHIPPING_ADDRESS}</div>
</div>
</div>
<div style="border-bottom: 1px dotted #000; text-align: center;">
<div style="font-size: 20px;">{PARTNER_ID_BARCODE}</div>
</div>
<div class="section" style="border-bottom: 1px dotted #000;">{SHIPPING_COMMUNE}, {SHIPPING_DISTRICT}</div>
<div style="border-bottom: 1px dotted #000;">
<div style="display: flex; justify-content: space-between;">
<div style="font-size: 10px;">{SORT_CODE_GHN}</div>
<div style="font-size: 10px;">{QR_CODE_EXTEND_CODE}</div>
</div>
</div>
<div class="section" style="padding: 0;">
<div>{NOTE_GHN}</div>
</div>
<div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 5px; font-size: 10px;">
<div>K&iacute; t&ecirc;n</div>
<div>X&aacute;c nhận h&agrave;ng nguy&ecirc;n vẹn</div>
<div align="center">
<div><img src="/image/print_logo_ghn_3.png" width="60px" /></div>
</div>
<div>1/1</div>
</div>
</div>`


