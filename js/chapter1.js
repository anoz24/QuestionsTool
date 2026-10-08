// Chapter 1 questions. Helpers: m(q,...opts) = MCQ, g(...) = MCQ with EGP options, plain strings = True/False.
const NO = "None of the above, the answer is: .....";
const g = (q, a, b, c, x) => [q, [a + " EGP.", b + " EGP.", c + " EGP.", NO], x];
const m = (q, ...o) => [q, o];
const A5 = ["Assets", "liabilities", "owners equity", "expenses", "Revenues"];
const C1 = "Some of assets, and liabilities are as follows: Machines and equipment 10,000 EGP, land and buildings 80,000 EGP, accounts receivable 30,000 EGP, inventory 40,000 EGP, long-term loans 20,000 EGP, accounts payable 25,000 EGP, expenses payable 10,000 EGP. In light of the previous data, choose the correct answer for each of the following questions:";
const C2 = "If you know that DR. Ahmed Ibrahim started his business at the beginning of 2022 with a capital of 50,000 EGP. At the end of the year, the project achieved a profit of 30,000 EGP. If you know that the personal withdrawals amounted to 10,000 EGP. Required:";
const E = ["50,000 EGP.", "30,000 EGP.", "10,000 EGP.", "90,000 EGP.", "70,000 EGP."];
const eq = (q) => [q, E, C2];
const TFI = "Put (✔) with the correct statement, and (✖) with the incorrect statement";
var D = [
    { t: "Slides 14/15", i: TFI + ".", q: ["The sole purpose of the accounting is to determine the profit or loss of the project.", "One of the objectives of the accounting is to determine the profit or loss of the project.", "The terms rights and resources are the assets of the enterprise.", "The terms Obligations and debts are the liabilities of the enterprise.", "Accounting is concerned with all transactions, financial or non-financial.", "Accounting is concerned with non-financial transactions only.", "Profit or loss = expenses - revenues.", "Profit or loss = Revenues - Expenses.", "Profit or loss = expenses + revenues.", "Profit or loss = Revenues + Expenses.", "Accounting is concerned with financial transactions only.", "The assets and liabilities of the entity are determined by the income statement.", "The profit or loss of the enterprise is determined by the statement of cash flows.", "Cash in and cash out of the entity is determined by the statement of Owner's Equity.", "The rights of the owner of the entity are determined by the statement of financial position."] },
    { t: "Slide 26", i: TFI + ":", q: ["Furniture is one of the assets.", "Accounts receivable are current assets.", "Accounts payable is one of the current liabilities.", "There is no difference between the advanced (prepaid) expenses and the expenses payable.", "There is no difference between the advanced (prepaid) revenues and the revenues receivable (accrued revenues)", "Entity Assets - Entity Liabilities = Net Assets", "Equity = Owner's Equity.", "Owners' Equity = Assets – Liabilities.", "Liabilities = Assets - Owners' Equity", "Assets = Liabilities + Owners' Equity (Basic Accounting Equation)."] },
    {
        t: "Slides 28:32", i: "Choose the correct answer.", q: [
            m("Which of the following correctly represents the basic accounting equation?", "Assets = liabilities + owner's equity.", "Assets = owner's equity.", "Assets = liabilities - owner's equity.", "Assets + liabilities = owner's equity."),
            m("Which of these items is an expense?", "Bank loan.", "owner's equity.", "Land.", "current period's rent."),
            m("Which of the following would not be included on balance sheet?", "Accounts receivable.", "Accounts payable.", "Sales.", "Cash."),
            g("Total Assets equal:", "160,000", "140,000", "180,000", C1), g("Total liabilities equal:", "45,000", "55,000", "160,000", C1), g("Total fixed assets equal:", "80,000", "70,000", "90,000", C1), g("Total current assets are equal to:", "80,000", "70,000", "90,000", C1), g("Long-term liabilities are equal:", "40,000", "20,000", "30,000", C1), g("Current liabilities are equal:", "50,000", "40,000", "35,000", C1), g("Net assets equal:", "15,000", "30,000", "45,000", C1), g("Owner's equity equals:", "10,000", "20,000", "40,000", C1)]
    },
    {
        t: "Slides 39:49", i: "Choose the best answer for each of the following items:", q: [
            m("One of the assets:", "Machines", "Accounts Payable", "Loans", "income"),
            m("One of the liabilities:", "Machines", "Accounts Receivable", "Loans", "Income"),
            m("One of the owners equity:", "Capital", "Accounts Payable", "Loans", "Buildings"),
            m("One of the expenses:", "Advertising", "Accounts Payable", "Loans", "Income"),
            m("One of the revenues:", "Machines", "Accounts Payable", "Loans", "rent collected"),
            ["Equipment is one of the:", A5], ["Long-term loans are:", A5], ["Salaries are:", A5],
            m("Cash is:", "Asset.", "Liability.", "owners equity", "expense", "Revenue"),
            m("Financial accounting focuses on:", "All transactions.", "Financial transactions.", "Non-financial transactions.", "All the above."),
            m("Among the objectives of financial accounting are the following:", "Determining the company's profit or loss.", "Determining the assets and debts of the enterprise.", "Determining the owner's equity of the entity.", "All the above."),
            m("The entities make profits if:", "Revenues more than expenses.", "Revenue equals expenses.", "Expenses more than revenues.", "None of the above."),
            m("Accounting:", "Science and profession.", "Science Only.", "Profession only.", "Function only."),
            m("Types of intangible assets:", "Patent.", "Goodwill (Reputation).", "Trade Name.", "Trade mark (brand).", "All the above."),
            m("The terms used in the accounting are:", "Assets and Liabilities.", "Revenues and expenses.", "owner's equity.", "all the above."),
            m("Accounting provides useful information for:", "Management of the entity only.", "Employees of the entity.", "Owners of the entity only.", "All the above."),
            m("All of the following are assets of the enterprise except:", "Lands.", "Buildings.", "Capital.", "Accounts Receivable."),
            m("All of the following are liabilities of the firm except:", "Short term loans.", "Notes payable.", "Machines and equipment.", "Capital.", "Accounts payable."),
            m("Sales revenues of the Meram's entity during the month of December 2022 are 100,000 EGP. Expenses represent 60% of these sales. Based on this information, the profit for this month equal:", "60,000 EGP.", "40,000 EGP.", "100,000 EGP.", "None of the above."),
            m("Goody's stores' assets include fixed assets of 50,000 EGP, and current assets of 30,000 EGP. Goody's stores' liabilities include long-term liabilities of 30,000 EGP, and short-term liabilities of 20,000 EGP. Based on this information, the Owner's Equity equal:", "80,000 EGP.", "50,000 EGP.", "130,000 EGP.", "30,000 EGP."),
            eq("What is the value of equity at the beginning of 2022:"), eq("What is the value of equity at the end of 2021:"), eq("What is the value of equity at the end of 2022:"), eq("What is the value of equity at the beginning of 2023:"),
            m("Short-term loans are:", "Assets", "liabilities", "expenses", "Revenues"),
            m("wages are:", "Asset.", "Liability.", "owner's equity.", "Expense."),
            m("Cost of goods sold is:", "Liability.", "owners equity", "Expense.", "Revenue."),
            m("One of the assets:", "Computers.", "Accounts Payable.", "Loans.", "Income."),
            m("One of the liabilities:", "Machines.", "Accounts Receivable.", "Accounts Payable.", "Income."),
            m("One of the owners equity:", "Income.", "Accounts Payable.", "Loans.", "Buildings.")]
    }];

window.SHEET = { key: "acc1", title: "Chapter 1 – Answer Sheet", file: "Chapter_1", data: D };
