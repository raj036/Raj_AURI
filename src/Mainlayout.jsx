import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import SetNewPassword from "./Pages/Login/SetNewPassword";
import PasswordReset from "./Pages/Login/PasswordReset";
import Inventory from "./Pages/Inventory/Inventory";
import AddProductForm from "./Pages/Inventory/AddProduct";
import UserManagement from "./Pages/UserManagement/UserManagement";
import BranchManagement from "./Pages/BranchManagement/BranchManagement";
import AddBranchForm from "./Pages/UserManagement/AddBranchForm";
import AddUserForm from "./Pages/BranchManagement/addUser";
import PDP from "./Pages/PDP/PDP";
import ProtectedRoute from "./Components/ProtectedRoute";
import PurchaseOrders from "./Pages/PurchaseOrders/PurchaseOrders";
import CustomerManagement from "./Pages/CustomersManagement/CustomersManagement";
import Packages from "./Pages/Packages/Packages";
import Shipments from "./Pages/Shipments/Shipments";
import SalesLedger from "./Pages/SalesPurchaseLedger/SalesPurchaseLedger";
import AddPackage from "./Pages/Packages/AddPackage";
import AddShipments from "./Pages/Shipments/AddShipments";
import AddCustomer from "./Pages/CustomersManagement/AddCustomer";
import DeliveryChalan from "./Pages/DeliveryChalan/DeliveryChalan";
import Invoices from "./Pages/Invoices/Invoices";
import PaymentsRecieved from "./Pages/PaymentsRecieved/PaymentsRecieved";
import SalesReturns from "./Pages/SalesReturns/SalesReturns";
import CreditNotes from "./Pages/CreditNotes/CreditNotes";
import Vendors from "./Pages/Vendors/Vendors";
import Bills from "./Pages/Bills/Bills";
import PaymentsMade from "./Pages/PaymentsMade/PaymentsMade";
import VendorCredits from "./Pages/VendorCredits/VendorCredits";
import AddInvoices from "./Pages/Invoices/AddInvoices";
import AddPaymentRecieved from "./Pages/PaymentsRecieved/AddPaymentsRecieved";
import AddSalesReturns from "./Pages/SalesReturns/AddSalesReturns";
import AddCreditNotes from "./Pages/CreditNotes/AddCreditNotes";
import AddVendors from "./Pages/Vendors/AddVendors";
import AddBills from "./Pages/Bills/AddBills";
import AddPaymentsMade from "./Pages/PaymentsMade/AddPaymentsMade";
import AddVendorsCredits from "./Pages/VendorCredits/AddVendorCredits";
import SalesOrder from "./Pages/SalesOrders/SalesOrder";
import Services from "./Pages/Services/Services";
import Tax from "./Pages/Tax/Tax";
import Bank from "./Pages/Bank/Bank";
import AddServices from "./Pages/Services/AddServices";
import AddTax from "./Pages/Tax/AddTax";
import AddBank from "./Pages/Bank/AddBank";
import Staff from "./Pages/Staff/Staff";
import AddStaff from "./Pages/Staff/AddStaff";
import AddDeliveryChalan from "./Pages/DeliveryChalan/AddDeliveryChalan";
import TechnicianModule from "./Pages/TechnicianModule/TechnicianModule";
import TaskManagement from "./Pages/TaskManagement/TaskManagement";
import LiveTrackinglocations from "./Pages/LiveTrackingLocation/Livetrackinglocation";
import CustomerSupport from "./Pages/CustomerHelpSupport/CustomerHelpSupport";
import CompanyDocuments from "./Pages/CompanyDocuments/CompanyDocuments";
import AttendanceManagement from "./Pages/AttendanceManagement/AttendanceManagement";
import PerfomanceManagement from "./Pages/PerfomanceManagement/PerfomanceManagement";
import CommonStaff from "./Pages/CommonStaffDashboard/CommonStaff";
import CompanyInformation from "./Pages/CompanyInformation/index.jsx"
import Subscription from "./Pages/Subscriptions/index.jsx";
import QuotationManagement from "./Pages/QuotationManagement/index.jsx";
import AddQuotation from "./Pages/QuotationManagement/AddQuotation.jsx";
import CustomerHelpSupport from "./Pages/CustomerHelpSupport/CustomerHelpSupport.jsx";
import SalaryManagement from "./Pages/SalaryManagement/SalaryManagement.jsx";
import LeaveManagement from "./Pages/LeaveManagement/LeaveManagement.jsx";
import Dashboard from "./Components/Dashboard.jsx";
import Test from "./Components/Test.jsx"
import CustomerCompanyStaff from "./Pages/Customer-Company-Staff/CustomerCompanyStaff.jsx";
import SubscriptionlogScreen from "./Pages/Subscription-Log-Screen/SubscriptionlogScreen.jsx";
import CompanyDetails from "./Pages/Customer-Company-Staff/CompanyDetails.jsx";
import SalesInvoices from "./Pages/SalesInvoices/SalesInvoices.jsx";
import BranchLayout from "./Components/Layout/BranchLayout.jsx"
import Customers from "./Pages/AccountsModule/Customers.jsx"
import AddCustomers from "./Pages/AccountsModule/AddCustomers.jsx"
import AccountVendor from "./Pages/AccountsModule/AccountVendor.jsx";
import AddVendor from "./Pages/AccountsModule/AddVendor.jsx";
import Invoice from "./Pages/AccountsModule/Invoice.jsx"
import CreateInvoice from "./Pages/AccountsModule/CreateInvoice.jsx"
import AccountBills from "./Pages/AccountsModule/AccountBills.jsx";
import CreateBills from "./Pages/AccountsModule/CreateBills.jsx";
import Attendance from "./Pages/AttendenceSalaryLeave/Attendence.jsx";
import AddAttendence from "./Pages/AttendenceSalaryLeave/AddAttendence.jsx";
import AddSalary from "./Pages/AttendenceSalaryLeave/AddSalary.jsx";
import Salary from "./Pages/AttendenceSalaryLeave/Salary.jsx";
import Leave from "./Pages/AttendenceSalaryLeave/Leave.jsx";
import AddLeave from "./Pages/AttendenceSalaryLeave/AddLeave.jsx";
import CreateCustomerSupport from "./Pages/CustomerHelpSupport/CreateCustomerSupport.jsx";
import AddTask from "./Pages/TaskManagement/AddTask.jsx";
import Ledger from "./Pages/Ledger/Ledger.jsx"
import AddLedger from "./Pages/Ledger/AddLedger.jsx"
import Voucher from "./Pages/Voucher/Voucher.jsx"
import AddVoucher from "./Pages/Voucher/AddVoucher.jsx"
import Account from "./Pages/ChartsOfAccount/Account.jsx"
import AddAccount from "./Pages/ChartsOfAccount/AddAccount.jsx"
import JournalEntry from "./Pages/JournalEntry/JounalEntry.jsx"
import TrailBalanceReport from "./Pages/TrailBalanceReport/TrailBalanceReport.jsx"
import ProfitAndLossReport from "./Pages/ProfitAndLossReport/ProfitAndLossReport.jsx"
import BalanceSheetReport from "./Pages/BalanceSheetReport/BalanceSheetReport.jsx"
import JournalVoucher from "./Pages/JournalVoucher/JournalVoucher.jsx"
import AddJournalVoucher from "./Pages/JournalVoucher/AddJournalVoucher.jsx"
import LeadManagement from "./Pages/LeadManagement/LeadManagement.jsx";
import AddLead from "./Pages/LeadManagement/AddLead.jsx";
import FollowUpManagement from "./Pages/FollowUpManagement/FollowUpManagement.jsx";
import AddFollowUp from "./Pages/FollowUpManagement/AddFollowUp.jsx";
import AddContraVoucher from "./Pages/VoucherAndTransaction/AddContraVoucher.jsx";
import AddOpeningBalance from "./Pages/VoucherAndTransaction/AddOpeningBalance.jsx";
import AddDebitNote from "./Pages/VoucherAndTransaction/AddDebitNote.jsx";


const MainLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/company-information" element={<CompanyInformation />} />
            <Route path="/company-documents" element={<CompanyDocuments />} />
            <Route path="/subscription" element={<Subscription />} />

        {/* Protected Routes */}
        <Route
          path="/Common-Staff"
          element={
            <ProtectedRoute>
              <CommonStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Sales-Ledger"
          element={
            <ProtectedRoute>
              <SalesLedger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Tax"
          element={
            <ProtectedRoute>
              <Tax />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Bank"
          element={
            <ProtectedRoute>
              <Bank />
            </ProtectedRoute>
          }
        />
        <Route
          path="/User-Management"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Customer-Management"
          element={
            <ProtectedRoute>
              <CustomerManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lead-management"
          element={
            <ProtectedRoute>
              <LeadManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-lead"
          element={
            <ProtectedRoute>
              <AddLead />
            </ProtectedRoute>
          }
        />
        <Route
          path="/follow-up-management"
          element={
            <ProtectedRoute>
              <FollowUpManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-follow-up"
          element={
            <ProtectedRoute>
              <AddFollowUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfomance-management"
          element={
            <ProtectedRoute>
              <PerfomanceManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Sales-Return"
          element={
            <ProtectedRoute>
              <SalesReturns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Credit-Notes"
          element={
            <ProtectedRoute>
              <CreditNotes />
            </ProtectedRoute>
          }
        />
          <Route
          path="/Quotation-Management"
          element={
            <ProtectedRoute>
              <QuotationManagement />
            </ProtectedRoute>
          }
        />
          <Route
          path="/Add-Quotation"
          element={
            <ProtectedRoute>
              <AddQuotation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Delivery-Chalan"
          element={
            <ProtectedRoute>
              <DeliveryChalan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Add-Delivery-Chalan"
          element={
            <ProtectedRoute>
              <AddDeliveryChalan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Invoices"
          element={
            <ProtectedRoute>
              <Invoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Payments-Received"
          element={
            <ProtectedRoute>
              <PaymentsRecieved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance-management"
          element={
            <ProtectedRoute>
              <AttendanceManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Packages"
          element={
            <ProtectedRoute>
              <Packages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Vendors"
          element={
            <ProtectedRoute>
              <Vendors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Bills"
          element={
            <ProtectedRoute>
              <Bills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Payments-Made"
          element={
            <ProtectedRoute>
              <PaymentsMade />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Vendors-Credit"
          element={
            <ProtectedRoute>
              <VendorCredits />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Shipments"
          element={
            <ProtectedRoute>
              <Shipments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Staff"
          element={
            <ProtectedRoute>
              <Staff />
            </ProtectedRoute>
          }
        />
         <Route
          path="/Customer-Company-Staff"
          element={
            <ProtectedRoute>
              <CustomerCompanyStaff />
            </ProtectedRoute>
          }
        />
          <Route
          path="/Subscription-log-screen"
          element={
            <ProtectedRoute>
              <SubscriptionlogScreen />
            </ProtectedRoute>
          }
        />
         <Route
          path="/Company-Details"
          element={
            <ProtectedRoute>
              <CompanyDetails />
            </ProtectedRoute>
          }
        />
         <Route
          path="/Sales-Invoices"
          element={
            <ProtectedRoute>
              <SalesInvoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-staff"
          element={
            <ProtectedRoute>
              <AddStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Branch-Management"
          element={
            <ProtectedRoute>
              <BranchManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <AddProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRoute>
              <AddBranchForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-branch"
          element={
            <ProtectedRoute>
              <AddUserForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-invoices"
          element={
            <ProtectedRoute>
              <AddInvoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-services"
          element={
            <ProtectedRoute>
              <AddServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-tax"
          element={
            <ProtectedRoute>
              <AddTax />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-bank"
          element={
            <ProtectedRoute>
              <AddBank />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-payments-recieved"
          element={
            <ProtectedRoute>
              <AddPaymentRecieved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-sales-returns"
          element={
            <ProtectedRoute>
              <AddSalesReturns />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-credit-notes"
          element={
            <ProtectedRoute>
              <AddCreditNotes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-vendors"
          element={
            <ProtectedRoute>
              <AddVendors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-bills"
          element={
            <ProtectedRoute>
              <AddBills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-payments-made"
          element={
            <ProtectedRoute>
              <AddPaymentsMade />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-vendor-credits"
          element={
            <ProtectedRoute>
              <AddVendorsCredits />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pdp"
          element={
            <ProtectedRoute>
              <PDP />
            </ProtectedRoute>
          }
        />
        <Route
          path="/purchase-orders"
          element={
            <ProtectedRoute>
              <PurchaseOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales-orders"
          element={
            <ProtectedRoute>
              <SalesOrder />
            </ProtectedRoute>
          }
        />
          <Route
          path="/Customer-Help-Support"
          element={
            <ProtectedRoute>
              <CustomerHelpSupport />
            </ProtectedRoute>
          }
        />
          <Route
          path="/create-customer-support"
          element={
            <ProtectedRoute>
              <CreateCustomerSupport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Technician-Module"
          element={
            <ProtectedRoute>
              <TechnicianModule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Task-Management"
          element={
            <ProtectedRoute>
              <TaskManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Add-Task"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />
           <Route
          path="/Salary-Management"
          element={
            <ProtectedRoute>
              <SalaryManagement />
            </ProtectedRoute>
          }
        />
          <Route
          path="/Leave-Management"
          element={
            <ProtectedRoute>
              <LeaveManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Live-Tracking-Location"
          element={
            <ProtectedRoute>
              <LiveTrackinglocations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-customer"
          element={
            <ProtectedRoute>
              <AddCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-package"
          element={
            <ProtectedRoute>
              <AddPackage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-shipment"
          element={
            <ProtectedRoute>
              <AddShipments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/balance-sheet-report"
          element={
            <ProtectedRoute>
              <BalanceSheetReport/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/branch-sidebar"
          element={
            <ProtectedRoute>
              <BranchLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addcustomers"
          element={
            <ProtectedRoute>
              <AddCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addvendor"
          element={
            <ProtectedRoute>
              <AddVendor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor"
          element={
            <ProtectedRoute>
              <AccountVendor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-invoices"
          element={
            <ProtectedRoute>
              <CreateInvoice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoice"
          element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account-bills"
          element={
            <ProtectedRoute>
              <AccountBills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-bills"
          element={
            <ProtectedRoute>
              <CreateBills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendence"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-attendence"
          element={
            <ProtectedRoute>
              <AddAttendence />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-salary"
          element={
            <ProtectedRoute>
              <AddSalary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/salary"
          element={
            <ProtectedRoute>
              <Salary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave"
          element={
            <ProtectedRoute>
              <Leave />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-leave"
          element={
            <ProtectedRoute>
              <AddLeave />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ledger"
          element={
            <ProtectedRoute>
              <Ledger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-ledger"
          element={
            <ProtectedRoute>
              <AddLedger />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voucher"
          element={
            <ProtectedRoute>
              <Voucher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-voucher"
          element={
            <ProtectedRoute>
              <AddVoucher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-account"
          element={
            <ProtectedRoute>
              <AddAccount/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <JournalEntry/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/trail-balance"
          element={
            <ProtectedRoute>
              <TrailBalanceReport/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profit-loss-report"
          element={
            <ProtectedRoute>
              <ProfitAndLossReport/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/balance-sheet-report"
          element={
            <ProtectedRoute>
              <BalanceSheetReport/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal-voucher"
          element={
            <ProtectedRoute>
              <JournalVoucher/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-journal-voucher"
          element={
            <ProtectedRoute>
              <AddJournalVoucher/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-opening-balance"
          element={
            <ProtectedRoute>
              <AddOpeningBalance/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-debit-note"
          element={
            <ProtectedRoute>
              <AddDebitNote/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-contra-voucher"
          element={
            <ProtectedRoute>
              <AddContraVoucher/> 
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainLayout;
