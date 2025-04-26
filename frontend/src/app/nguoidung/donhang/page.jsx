"use client";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { Search } from "lucide-react";
import axios from "axios";
import { Image } from 'primereact/image';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
const inforOrder = {
    id: 0,
    user_id: 0,
    name: "",
    nameProduct: "",
    address: "",
    status: "",
    note: "",
    total: 0,
    payment_method_id: null,
    image: [],
};

export default function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState(inforOrder);
    const [user, setUser] = useState({});
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [id, setId] = useState("");
    const [editOrder, setEditOrder] = useState(false);
    const [selectedPay, setSelectedPay] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const toast = useRef(null);

    const statusOptions = [
        { label: "Đang Xử Lý", value: "Đang Xử Lý" },
        { label: "Đặt Hàng Thành Công", value: "Đặt Hàng Thành Công" },
        { label: "Đang Giao Hàng", value: "Đang Giao Hàng" },
        { label: "Giao Hàng Thành Công", value: "Giao Hàng Thành Công" },
        { label: "Yêu Cầu Hủy", value: "Yêu Cầu Hủy" },
    ];

    useEffect(() => {
        const data = localStorage.getItem("data");
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                if (parsedData && parsedData.user && parsedData.user.id) {
                    setId(parsedData);
                }
            } catch (err) {
                console.error("Lỗi khi parse dữ liệu từ localStorage:", err);
            }
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (id?.user) {
                try {
                    const response = await axios.get("http://localhost:3000/orders/getOrdersByIdUser", {
                        params: {
                            id: id?.user.id,
                        }
                    });
                    if (response.data) {
                        setOrders(response.data);
                    } else {
                        console.error("API trả về dữ liệu không hợp lệ");
                    }
                } catch (err) {
                    setError("Lỗi khi tải danh sách đơn hàng.");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchOrders();
    }, [id]);


    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await axios.get("http://localhost:3000/paymentmethods/getAllPaymentmethods");
                setPaymentMethods(response.data);
            } catch (err) {
                console.error("Lỗi khi tải danh sách phương thức thanh toán:", err);
            }
        };
        fetchPaymentMethods();
    }, []);

    const filteredOrders = orders.filter((item) => {
        const matchesSearch = item.nameProduct.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = !selectedStatus || item.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    // Reset form
    const resetForm = () => {
        setOrder(inforOrder);
        setFormVisible(false);
        setEditOrder(false);
        setSelectedPay(null);
        setUser({});
    };

    const handleEdit = (rowData) => {
        const data = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/getUsersById`, {
                    params: {
                        id: rowData.user_id,
                    },
                    headers: {
                        Authorization: `Bearer ${id?.token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        data();
        setOrder(rowData);
        setFormVisible(true);
        const payMethod = paymentMethods.find((method) => method.id === rowData.payment_method_id);
        setSelectedPay(payMethod);
        setEditOrder(true);
    };

    const handleViewDetails = (rowData) => {
        const data = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/getUsersById`, {
                    params: {
                        id: rowData.user_id,
                    },
                    headers: {
                        Authorization: `Bearer ${id?.token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        data();
        setOrder(rowData);
        setFormVisible(true);
        const payMethod = paymentMethods.find((method) => method.id === rowData.payment_method_id);
        setSelectedPay(payMethod);
        setEditOrder(false);
    };

    const btnUpdateOrder = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/orders/updateOrders`,
                {
                    ...order,
                    user_id: order.user_id,
                    status: order.status,
                    address: `${order.address}`,
                    note: order.note
                }, {
                params: {
                    id: order.id
                }
            });
            if (response.status === 200) {
                toast.current.show({ severity: "success", summary: "Cập nhật đơn hàng", detail: "Đơn hàng đã cãp nhật", life: 3000 });
                resetForm();
                window.location.reload();
            }
            else {
                toast.current.show({ severity: "error", summary: "Lỗi cập nhật đơn hàng", detail: "Có lỗi xây ra", life: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    };
    const btnDelete = async (rowData) => {
        if (!window.confirm(`Bạn Có Muốn Hủy Đơn Hàng ${rowData.nameProduct}?`)) return;
        try {
            const response = await axios.put(`http://localhost:3000/orders/updateOrders`,
                {
                    ...order,
                    user_id: order.user_id,
                    status: "Yêu Cầu Hủy",
                    address: `${order.address}`,
                    note: order.note
                }, {
                params: {
                    id: order.id
                }
            });
            if (response.status === 200) {
                toast.current.show({ severity: "success", summary: "Hủy đơn hàng", detail: "Đơn hàng đã yêu cầu hủy", life: 3000 });
                resetForm();
                window.location.reload();
            }
            else {
                toast.current.show({ severity: "error", summary: "Lỗi cập nhật đơn hàng", detail: "Có lỗi xây ra", life: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="p-4 w-full h-full relative">
            <Toast ref={toast} />
            <h2 className="text-3xl text-orange-600 text-center w-full font-bold mb-6">Danh Sách Đơn Hàng</h2>
            <Dialog
                visible={formVisible}
                style={{ width: "60vw", maxHeight: "90vh" }}
                modal
                draggable
                onHide={() => setFormVisible(false)}
            >
                <div className="relative p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                    <h2 className="text-2xl font-bold text-center text-orange-600">Chi Tiết Đơn Hàng</h2>
                    <div className="grid grid-cols-1 space-y-4 md:grid-cols-2 gap-4">
                        <FloatLabel>
                            <InputText id="name" value={order.name || ""} disabled className="w-full" />
                            <label htmlFor="name">Họ Và Tên</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText id="nameProduct" value={order.nameProduct || ""} disabled className="w-full" />
                            <label htmlFor="nameProduct">Sản Phẩm</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText id="phone" value={user.phone || ""} disabled className="w-full" />
                            <label htmlFor="phone">Số Điện Thoại</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText id="email" value={user.email || ""} disabled className="w-full" />
                            <label htmlFor="email">Email</label>
                        </FloatLabel>
                        <Dropdown
                            value={selectedPay}
                            options={paymentMethods}
                            onChange={(e) => setSelectedPay(e.value)}
                            optionLabel="name"
                            placeholder="Chọn Phương Thức Thanh Toán"
                            className="w-full"
                            disabled
                        />
                        <Dropdown
                            value={order.status}
                            options={statusOptions}
                            onChange={(e) => setOrder({ ...order, status: e.value })}
                            placeholder="Chọn Trạng Thái"
                            className="w-full"
                            disabled
                        />
                        <div className="col-span-2">
                            <FloatLabel>
                                <InputText
                                    value={order.total || ""}
                                    disabled
                                    className="w-full text-end text-red-600 font-bold"
                                />
                                <label htmlFor="total">Tổng Tiền</label>
                            </FloatLabel>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 mx-auto gap-4 col-span-2">
                            <Image id="IMG" src={`http://localhost:3000${order.image[0]}`} alt="Image" width="full" preview />
                            <FloatLabel>
                                <InputTextarea
                                    id="address"
                                    value={order.address || ""}
                                    className="w-full h-full"
                                    onChange={(e) => setOrder({ ...order, address: e.target.value })}
                                    rows={3}
                                />
                                <label htmlFor="address">Địa Chỉ</label>
                            </FloatLabel>
                        </div>
                    </div>
                    <div className="mt-4 w-full justify-center flex">
                    </div>
                    <div className="mt-4">
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Ghi Chú</h3>
                        <InputTextarea
                            value={order.note || ""}
                            className="w-full"
                            onChange={(e) => setOrder({ ...order, note: e.target.value })}
                            rows={5}
                        />
                    </div>
                    <div className="mt-4">
                        {editOrder && (
                            <Button
                                type="button"
                                label="Cập nhật"
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                                onClick={btnUpdateOrder}
                            />
                        )}
                    </div>
                </div>
            </Dialog>
            <div className="card">
                {error && <p className="text-red-500">Lỗi: {error}</p>}
                <DataTable
                    value={filteredOrders}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 50]}
                    tableStyle={{ minWidth: "85rem" }}
                    loading={loading}
                >
                    <Column header="STT" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: "5%" }} />
                    <Column field="name" header="Họ Tên" style={{ width: "15%" }} />
                    <Column field="nameProduct" header="Sản Phẩm" style={{ width: "20%" }} />
                    <Column field="status" header="Trạng Thái" style={{ width: "10%" }} />
                    <Column field="subtotal" header="Tổng Tiền" style={{ width: "10%" }} />
                    <Column
                        header="Chi Tiết"
                        body={(rowData) => (
                            <Button
                                icon="pi pi-eye"
                                className="p-button-rounded p-button-secondary"
                                onClick={() => handleViewDetails(rowData)}
                            />
                        )}
                        style={{ width: "6%" }}
                    />
                    <Column
                        header="Sửa"
                        body={(rowData) => (
                            <Button
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-info"
                                onClick={() => handleEdit(rowData)}
                            />
                        )}
                        style={{ width: "6%" }}
                    />
                    <Column header="Xóa" body={(rowData) => (
                        <Button
                            icon="pi pi-trash"
                            className="p-button-rounded p-button-danger"
                            onClick={() => btnDelete(rowData)}
                        />
                    )} style={{ width: "5%" }} />
                </DataTable>
            </div>
        </div>
    );
}