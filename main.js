
"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */

const gBASE_DRINK_LIST_URL = "http://203.171.20.210:8080/devcamp-pizza365/drinks";
// link get data order
const gBASE_ORDER_URL = "http://203.171.20.210:8080/devcamp-pizza365/orders";
// link get data voucher
const gBASE_VOUCHER_URL = "http://203.171.20.210:8080/devcamp-pizza365/voucher_detail/";
// biến kiểm tra trạng thái gọi api
const gREQUEST_STATUS_OK = 200;
const gREQUEST_READY_STATUS_FINISH_AND_OK = 4;
const gREQUEST_CREATE_SUCCESS = 201; // status 201 - tạo thành công


// các combo Pizza
const gCOMBO_SMALL = "Small";
const gCOMBO_MEDIUM = "Medium";
const gCOMBO_LARGE = "Large";
// các loại pizza
const gPIZZA_TYPE_OCEAN = "Ocean";
const gPIZZA_TYPE_HAWAIIAN = "Hawaiian";
const gPIZZA_TYPE_BACON = "Bacon";

var vOrderInfo;
var gDiscount = '';
/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
$(document).ready(function () {
    callApiToGetDataDrinkListSelect();
    // add sự kiện các nút chọn combo
    $("#btn-small").on("click", function () {
        onBtnSmallSizeClick();
    });
    $("#btn-medium").on("click", function () {
        onBtnMediumSizeClick();
    });
    $("#btn-large").on("click", function () {
        onBtnLargeSizeClick();
    });
    // add sự kiện các nút chọn loại pizza
    $("#btn-ocean").on("click", function () {
        onBtnOceanClick();
    });
    $("#btn-hawaiian").on("click", function () {
        onBtnHawaiianClick();
    });
    $("#btn-bacon").on("click", function () {
        onBtnBaconClick();
    });
    // add sự kiện nút gửi
    $("#btn-makeOder").on("click", function () {
        onBtnKiemTraDonClick();
    });
    // add sự kiện nút tạo đơn modal
    $("#btn-create-order").on("click", function () {
        onBtnCreateOrderClick();
    });
});
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */


// hàm được gọi khi bấm nút chọn kích cỡ S
function onBtnSmallSizeClick() {
    "use strict";
    // gọi hàm đổi màu nút
    // chỉnh combo, combo được chọn là Small, đổi nút, và đánh dấu
    // data-is-selected-menu của nút Basic là Y, các nút khác là N
    changeComboButtonColor(gCOMBO_SMALL);
    //tạo một đối tượng menu, được tham số hóa
    var vSelectedMenuStructure = getComboSelected("S", 20, 2, 200, 2, 150000);
    // gọi method hiển thị thông tin
    vSelectedMenuStructure.displayInConsoleLog();
}
// hàm được gọi khi bấm nút chọn kích cỡ M
function onBtnMediumSizeClick() {
    "use strict";
    // gọi hàm đổi màu nút
    // chỉnh combo, combo được chọn là Medium, đổi nút, và đánh dấu
    // data-is-selected-menu của nút Basic là Y, các nút khác là N
    changeComboButtonColor(gCOMBO_MEDIUM);
    //tạo một đối tượng menu, được tham số hóa
    var vSelectedMenuStructure = getComboSelected("M", 25, 4, 300, 3, 200000);
    // gọi method hiển thị thông tin
    vSelectedMenuStructure.displayInConsoleLog();
}
// hàm được gọi khi bấm nút chọn kích cỡ L
function onBtnLargeSizeClick() {
    "use strict";
    // gọi hàm đổi màu nút
    // chỉnh combo, combo được chọn là Large, đổi nút, và đánh dấu
    // data-is-selected-menu của nút Basic là Y, các nút khác là N
    changeComboButtonColor(gCOMBO_LARGE);
    //tạo một đối tượng menu, được tham số hóa
    var vSelectedMenuStructure = getComboSelected("L", 30, 8, 500, 4, 250000);
    // gọi method hiển thị thông tin
    vSelectedMenuStructure.displayInConsoleLog();
}
// hàm được gọi khi bấm nút chọn loại pizza gà
function onBtnOceanClick() {
    "use strict";
    // gọi hàm đổi màu nút
    // chỉnh loại pizza, loại pizza được chọn là GÀ , đổi nút, và đánh dấu
    // data-is-selected-pizza của nút gà là Y, các nút khác là N
    changeTypeButtonColor(gPIZZA_TYPE_OCEAN);
    // ghi loại pizza đã chọn ra console
    console.log("Loại pizza đã chọn: " + gPIZZA_TYPE_OCEAN);
}
// hàm được gọi khi bấm nút chọn loại pizza Hải sản
function onBtnHawaiianClick() {
    "use strict";
    // gọi hàm đổi màu nút
    // chỉnh loại pizza, loại pizza được chọn là Hải sản, đổi nút, và đánh dấu
    // data-is-selected-pizza của nút Hải sản là Y, các nút khác là N
    changeTypeButtonColor(gPIZZA_TYPE_HAWAIIAN);
    // ghi loại pizza đã chọn ra console
    console.log("Loại pizza đã chọn: " + gPIZZA_TYPE_HAWAIIAN);
}
// hàm được gọi khi bấm nút chọn loại pizza Hun khói
function onBtnBaconClick() {
    "use strict";
    // gọi hàm đổi màu nút
    // chỉnh loại pizza, loại pizza được chọn là Bacon, đổi nút, và đánh dấu
    // data-is-selected-pizza của nút Bacon là Y, các nút khác là N
    changeTypeButtonColor(gPIZZA_TYPE_BACON);
    // ghi loại pizza đã chọn ra console
    console.log("Loại pizza đã chọn: " + gPIZZA_TYPE_BACON);
}
// Hàm được gọi khi click nút kiểm tra đơn
function onBtnKiemTraDonClick() {
    console.log("%c Kiểm tra đơn", "color: orange;");
    // Bước 1: Đọc
    var vOrder = getOrder();
    //Bước 2: kiểm tra
    var vKetQuaKiemTra = checkValidatedForm(vOrder);
    if (vKetQuaKiemTra) {
        //Bước 3: Hiển thị
        showOrderInfo(vOrder)
    }
}

// Hàm bấm nút tạo đơn
function onBtnCreateOrderClick() {
    'use strict';
    $("#order-modal").modal('hide');
    $("#create-order-success-modal").modal('show');

    var vObjectRequest = {
        kichCo: "",
        duongKinh: "",
        suon: "",
        salad: "",
        loaiPizza: "",
        idVourcher: "",
        idLoaiNuocUong: "",
        soLuongNuoc: "",
        hoTen: "",
        thanhTien: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: ""
    };
    vObjectRequest.kichCo = vOrderInfo.menuCombo.menuName;
    vObjectRequest.duongKinh = vOrderInfo.menuCombo.duongKinhCM;
    vObjectRequest.suon = vOrderInfo.menuCombo.suongNuong;
    vObjectRequest.salad = vOrderInfo.menuCombo.saladGr;
    vObjectRequest.loaiPizza = vOrderInfo.loaiPizza;
    vObjectRequest.idVourcher = vOrderInfo.voucher;
    vObjectRequest.idLoaiNuocUong = vOrderInfo.loaiNuocUong;
    vObjectRequest.soLuongNuoc = vOrderInfo.menuCombo.drink
    vObjectRequest.hoTen = vOrderInfo.hoVaTen;
    vObjectRequest.thanhTien = vOrderInfo.priceAnnualVND();
    vObjectRequest.email = vOrderInfo.email;
    vObjectRequest.soDienThoai = vOrderInfo.dienThoai;
    vObjectRequest.diaChi = vOrderInfo.diaChi;
    vObjectRequest.loiNhan = vOrderInfo.loiNhan;
    callApiToCreateOrder(vObjectRequest);
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
function callApiToCreateOrder(paramOrderInfo) {
    "use strict";
    var vXmlHttpCreateOrder = new XMLHttpRequest();
    vXmlHttpCreateOrder.open("POST", gBASE_ORDER_URL, true);
    vXmlHttpCreateOrder.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    vXmlHttpCreateOrder.send(JSON.stringify(paramOrderInfo));
    vXmlHttpCreateOrder.onreadystatechange = function () {
        if (this.readyState == gREQUEST_READY_STATUS_FINISH_AND_OK && this.status == gREQUEST_CREATE_SUCCESS) { // status 201 tao thanh cong
            var vCreatedOrder = vXmlHttpCreateOrder.responseText;
            var vCreatedOrderObj = JSON.parse(vCreatedOrder);
            // hàm xử lý hiển thị khi tạo đơn hàng thành công
            createOrderSuccess(vCreatedOrderObj);
        }
    }
}

function createOrderSuccess(paramCreateOrderObj) {
    'use strict'
    $("#order-code").val(paramCreateOrderObj.orderCode);
}

//function get combo (lấy menu được chọn)
//function trả lại một đối tượng combo (menu được chọn) được tham số hóa
function getComboSelected(
    paramMenuName,
    paramDuongKinhCM,
    paramSuongNuong,
    paramSaladGr,
    paramDrink,
    paramPriceVND
) {
    'use strict';
    var vSelectedMenu = {
        menuName: paramMenuName, // S, M, L
        duongKinhCM: paramDuongKinhCM,
        suongNuong: paramSuongNuong,
        saladGr: paramSaladGr,
        drink: paramDrink,
        priceVND: paramPriceVND,
        displayInConsoleLog() {
            console.log("%cPLAN MENU COMBO - .........", "color:blue");
            console.log(this.menuName); //this = "đối tượng này"
            console.log("duongKinhCM: " + this.duongKinhCM);
            console.log("suongNuong: " + this.suongNuong);
            console.log("saladGr: " + this.saladGr);
            console.log("drink:" + this.drink);
            console.log("priceVND: " + this.priceVND);
        },
    };
    return vSelectedMenu;
}

// hàm thu thập(đọc) thông tin khách hàng
function getOrder() {
    var vBtnBasic = $("#btn-small"); // truy vấn nút chọn kích cỡ small
    var vMenuBasicDaChon = vBtnBasic.attr("data-is-selected-menu");

    var vBtnMedium = $("#btn-medium"); //truy vấn nút chọn kích cỡ medium
    var vMenuMediumDaChon = vBtnMedium.attr("data-is-selected-menu");

    var vBtnLarge = $("#btn-large"); //truy vấn nút chọn kích cỡ large
    var vMenuLargeDaChon = vBtnLarge.attr("data-is-selected-menu");

    var vSelectedMenuStructure = getComboSelected("", 0, 0, 0, 0, 0);
    if (vMenuBasicDaChon === "Y") {
        vSelectedMenuStructure = getComboSelected("S", 20, 2, 200, 2, 150000);
    }
    else if (vMenuMediumDaChon === "Y") {
        vSelectedMenuStructure = getComboSelected("M", 25, 4, 300, 3, 200000);
    }
    else if (vMenuLargeDaChon === "Y") {
        vSelectedMenuStructure = getComboSelected("L", 30, 8, 500, 4, 250000);
    }
    var vBtnOcean = $("#btn-ocean"); // truy vấn nút chọn loại pizza gà
    var vPizzaOceanDaChon = vBtnOcean.attr("data-is-selected-pizza");

    var vBtnHawaiian = $("#btn-hawaiian"); //truy vấn nút chọn loại pizza hải sản
    var vPizzaHawaiianDaChon = vBtnHawaiian.attr("data-is-selected-pizza");

    var vBtnBacon = $("#btn-bacon"); //truy vấn nút chọn loại pizza bacon
    var vPizzaBaconDaChon = vBtnBacon.attr("data-is-selected-pizza");
    var vLoaiPizza = "";
    if (vPizzaOceanDaChon === "Y") {
        vLoaiPizza = gPIZZA_TYPE_OCEAN;
    }
    else if (vPizzaHawaiianDaChon === "Y") {
        vLoaiPizza = gPIZZA_TYPE_HAWAIIAN;
    }
    else if (vPizzaBaconDaChon === "Y") {
        vLoaiPizza = gPIZZA_TYPE_BACON;
    }
  
    var vValueInputName =  $("#inp-name").val();
    var vValueInputEmail = $("#inp-email").val();
    var vValueInputPhone = $("#inp-phone").val();
    var vValueInputAddress = $("#inp-address").val();
    var vValueInputMessage =  $("#inp-message").val();
    var vValueInputVoucherID =  $("#inp-voucher").val();
    var vValueSelectDrink =  $("#drink-select").val();

    var vPercent = 0;
    if (vValueInputVoucherID === "") {
        vPercent = 0;
    }
    else {
        vPercent = callApiCheckVoucher(vValueInputVoucherID);
    }
    vOrderInfo = {
        menuCombo: vSelectedMenuStructure,
        loaiPizza: vLoaiPizza,
        loaiNuocUong: vValueSelectDrink,
        hoVaTen: vValueInputName,
        email: vValueInputEmail,
        dienThoai: vValueInputPhone,
        diaChi: vValueInputAddress,
        loiNhan: vValueInputMessage,
        voucher: vValueInputVoucherID,
        phanTramGiamGia: vPercent,
        priceAnnualVND: function () {
            var vTotal = this.menuCombo.priceVND * (1 - vPercent / 100);
            return vTotal;
        }
    };
    return vOrderInfo;
}

function callApiCheckVoucher(paramVoucherID) {
    "use strict";
    var vPercent = 0;
    var vXmlHttp = new XMLHttpRequest();
    vXmlHttp.open("GET", gBASE_VOUCHER_URL + paramVoucherID, false);
    vXmlHttp.send(null);
    var vStatusCode = vXmlHttp.status;
    var vReadyState = vXmlHttp.readyState;
    if (vStatusCode == gREQUEST_STATUS_OK && vReadyState == gREQUEST_READY_STATUS_FINISH_AND_OK) { // restFullAPI successful
        // nhận lại response dạng JSON ở xmlHttp.responseText và chuyển thành object
        var vVoucherObj = JSON.parse(vXmlHttp.responseText);
        vPercent = vVoucherObj.phanTramGiamGia;
    }
    else {
        // không nhận lại được data do vấn đề gì đó: khả năng mã voucher không dúng
        alert("Không tìm thấy voucher " + paramVoucherID)
        vPercent = 0;
    }
    return vPercent;
}

function checkValidatedForm(paramOrder) {
    if (paramOrder.menuCombo.menuName === "") {
        alert("Chọn combo pizza...");
        return false;
    }
    if (paramOrder.loaiPizza === "") {
        alert("Chọn loại pizza...");
        return false;
    }
    if (paramOrder.loaiNuocUong === "null") {
        alert("Chọn loại nước uống...");
        return false;
    }

    if (paramOrder.hoVaTen === "") {
        alert("Nhập họ và tên");
        return false;
    }
    if (isEmail(paramOrder.email) == false) {
        return false;
    }
    if (paramOrder.dienThoai === "") {
        alert("Nhập vào số điện thoại...");
        return false;
    }
    if (paramOrder.diaChi === "") {
        alert("Địa chỉ không để trống...");
        return false;
    }
    return true;
}
// hàm đổi mầu nút khi chọn combo
function changeComboButtonColor(paramPlan) {
    var vBtnBasic = $("#btn-small"); // truy vấn nút chọn kích cỡ small
    var vBtnMedium = $("#btn-medium"); //truy vấn nút chọn kích cỡ medium
    var vBtnLarge = $("#btn-large"); //truy vấn nút chọn kích cỡ large

    if (paramPlan === gCOMBO_SMALL) {
        //nếu chọn menu Small thì thay màu nút chọn kích cỡ small bằng màu cam (btn-warning), hai nút kia xanh (btn-success)
        // đổi giá trị data-is-selected-menu
        vBtnBasic.removeClass("btn btn-warning w-100");
        vBtnBasic.addClass("btn btn-success w-100");
        vBtnBasic.attr("data-is-selected-menu", "Y");

        vBtnMedium.removeClass("btn btn-success w-100");
        vBtnMedium.addClass("btn btn-warning w-100");
        vBtnMedium.attr("data-is-selected-menu", "N");

        vBtnLarge.removeClass("btn btn-success w-100");
        vBtnLarge.addClass("btn btn-warning w-100");
        vBtnLarge.attr("data-is-selected-menu", "N");
    } else if (paramPlan === gCOMBO_MEDIUM) {
        //nếu chọn menu Medium thì thay màu nút chọn kích cỡ Medium bằng màu cam (btn-warning), hai nút kia xanh (btn-success)
        // đổi giá trị data-is-selected-menu
        vBtnBasic.removeClass("btn btn-success w-100");
        vBtnBasic.addClass("btn btn-warning w-100");
        vBtnBasic.attr("data-is-selected-menu", "N");

        vBtnMedium.removeClass("btn btn-warning w-100");
        vBtnMedium.addClass("btn btn-success w-100");
        vBtnMedium.attr("data-is-selected-menu", "Y");


        vBtnLarge.removeClass("btn btn-success w-100");
        vBtnLarge.addClass("btn btn-warning w-100");
        vBtnLarge.attr("data-is-selected-menu", "N");
    } else if (paramPlan === gCOMBO_LARGE) {
        //nếu chọn menu Large thì thay màu nút chọn kích cỡ Large bằng màu cam (btn-warning), hai nút kia xanh (btn-success)
        // đổi giá trị data-is-selected-menu
        vBtnBasic.removeClass("btn btn-success w-100");
        vBtnBasic.addClass("btn btn-warning w-100");
        vBtnBasic.attr("data-is-selected-menu", "N");

        vBtnMedium.removeClass("btn btn-success w-100");
        vBtnMedium.addClass("btn btn-warning w-100");
        vBtnMedium.attr("data-is-selected-menu", "N");

        vBtnLarge.removeClass("btn btn-warning w-100");
        vBtnLarge.addClass("btn btn-success w-100");
        vBtnLarge.attr("data-is-selected-menu", "Y");
    }
}

// hàm đổi mầu nút khi chọn loại pizza
function changeTypeButtonColor(paramType) {
    var vBtnOcean = $("#btn-ocean"); // truy vấn nút chọn loại pizza gà
    var vBtnHawaiian = $("#btn-hawaiian"); //truy vấn nút chọn loại pizza hải sản
    var vBtnBacon = $("#btn-bacon"); //truy vấn nút chọn loại pizza bacon
    if (paramType === gPIZZA_TYPE_OCEAN) {
        //nếu chọn loại pizza Gà thì thay màu nút chọn loại pizza gà bằng màu cam (btn-warning), hai nút kia xanh (btn-success)
        // đổi giá trị data-is-selected-pizza
        vBtnOcean.removeClass("btn btn-warning w-100");
        vBtnOcean.addClass("btn btn-success w-100");
        vBtnOcean.attr("data-is-selected-pizza", "Y");

        vBtnHawaiian.removeClass("btn btn-success w-100");
        vBtnHawaiian.addClass("btn btn-warning w-100");
        vBtnHawaiian.attr("data-is-selected-pizza", "N");

        vBtnBacon.removeClass("btn btn-success w-100");
        vBtnBacon.addClass("btn btn-warning w-100");
        vBtnBacon.attr("data-is-selected-pizza", "N");
    } else if (paramType === gPIZZA_TYPE_HAWAIIAN) {
        //nếu chọn loại pizza Hải sản thì thay màu nút chọn loại pizza Hải sản bằng màu cam (btn-warning), hai nút kia xanh (btn-success)
        // đổi giá trị data-is-selected-pizza
        vBtnOcean.removeClass("btn btn-success w-100");
        vBtnOcean.addClass("btn btn-warning w-100");
        vBtnOcean.attr("data-is-selected-pizza", "N");

        vBtnHawaiian.removeClass("btn btn-warning w-100");
        vBtnHawaiian.addClass("btn btn-success w-100");
        vBtnHawaiian.attr("data-is-selected-pizza", "Y");

        vBtnBacon.removeClass("btn btn-success w-100");
        vBtnBacon.addClass("btn btn-warning w-100");
        vBtnBacon.attr("data-is-selected-pizza", "N");
    } else if (paramType === gPIZZA_TYPE_BACON) {
        //nếu chọn loại pizza Bacon thì thay màu nút chọn loại pizza Bacon bằng màu cam (btn-warning), hai nút kia xanh (btn-success)
        // đổi giá trị data-is-selected-pizza
        vBtnOcean.removeClass("btn btn-success w-100");
        vBtnOcean.addClass("btn btn-warning w-100");
        vBtnOcean.attr("data-is-selected-pizza", "N");

        vBtnHawaiian.removeClass("btn btn-success w-100");
        vBtnHawaiian.addClass("btn btn-warning w-100");
        vBtnHawaiian.attr("data-is-selected-pizza", "N");

        vBtnBacon.removeClass("btn btn-warning w-100");
        vBtnBacon.addClass("btn btn-success w-100");
        vBtnBacon.attr("data-is-selected-pizza", "Y");
    }
}


//hàm kiểm tra email
function isEmail(paramEmail) {
    'use strict'
    if (paramEmail < 3) {
        alert("Nhập email...");
        return false;
    }
    if (paramEmail.indexOf("@") === -1) {
        alert("Email phải có ký tự @");
        return false;
    }
    if (paramEmail.startsWith("@") === true) {
        alert("Email không bắt đầu bằng @");
        return false;
    }
    if (paramEmail.endsWith("@") === true) {
        alert("Email kết thúc bằng @");
        return false;
    }
    return true;
}
/// hàm show thông tin đặt hàng
function showOrderInfo(paramOrder) {
    'use strict';
    $("#order-modal").modal("show");
    $("#input-fullname").val(paramOrder.hoVaTen);
    $("#input-phone").val(paramOrder.dienThoai);
    $("#input-address").val(paramOrder.diaChi);
    $("#input-idvoucher").val(paramOrder.voucher);
    $("#input-messeage").val(paramOrder.loiNhan);
    $("#input-detail-messeage").val(
        "Xác nhận: " + paramOrder.hoVaTen + ", " + paramOrder.dienThoai + ", " + paramOrder.diaChi + ".\n" +
        "Menu: " + "size " + paramOrder.menuCombo.menuName + ", sườn nướng " + paramOrder.menuCombo.suongNuong + ", nước " + paramOrder.menuCombo.drink + ".\n" +
        "Loại pizza: " + paramOrder.loaiPizza + ", giá: " + paramOrder.menuCombo.priceVND + ", mã giảm giá: " + paramOrder.voucher + ".\n" +
        "Phải thanh toán: " + paramOrder.priceAnnualVND() + " VND " + "(giảm giá " + paramOrder.phanTramGiamGia + "%)."
    );
}

// hàm xử lý gọi api lấy dữ liệu drink list
function callApiToGetDataDrinkListSelect() {
    "use strict";
    $.ajax({
        url: gBASE_DRINK_LIST_URL,
        type: "GET",
        dataType: "json",
        success: function (paramDrinkList) {
            handleDataToSelectDrinkList(paramDrinkList);
        },
        error: function (ajaxContext) {
            alert(ajaxContext.responseText);
        }
    })

}
// hàm xử lý đổ dữ liệu vào drink list
function handleDataToSelectDrinkList(paramDrinkList) {
    "use strict";
    $.each(paramDrinkList, function (i, item) {
        $("#drink-select").append($('<option>', {
            text: item.tenNuocUong,
            value: item.maNuocUong
        }))
    })
}

