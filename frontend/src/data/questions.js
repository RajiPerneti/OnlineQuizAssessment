export const questions = {
  MFEF: [
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: "<a>",
    },
    {
      question: "Which CSS property is used to change the text color?",
      options: ["font-color", "text-color", "color", "text-style"],
      answer: "color",
    },
    {
      question: "Which JavaScript keyword is used to declare a constant?",
      options: ["var", "let", "const", "static"],
      answer: "const",
    },
    {
      question: "Which React hook is commonly used to manage state?",
      options: ["useState", "useEffect", "useContext", "useRef"],
      answer: "useState",
    },
    {
      question: "Which HTML element is used to create an unordered list?",
      options: ["<ol>", "<ul>", "<li>", "<list>"],
      answer: "<ul>",
    },
    {
      question: "Which CSS property controls the space inside an element?",
      options: ["margin", "padding", "spacing", "border"],
      answer: "padding",
    },
    {
      question: "Which JavaScript method adds an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "add()"],
      answer: "push()",
    },
    {
      question: "What is JSX mainly used for in React?",
      options: [
        "Writing SQL queries",
        "Writing HTML-like syntax inside JavaScript",
        "Creating databases",
        "Styling web pages only",
      ],
      answer: "Writing HTML-like syntax inside JavaScript",
    },
    {
      question: "Which HTML attribute provides alternative text for an image?",
      options: ["title", "src", "alt", "href"],
      answer: "alt",
    },
    {
      question: "Which CSS layout system is useful for arranging items in rows and columns?",
      options: ["Float", "Grid", "Position", "Font"],
      answer: "Grid",
    },
  ],

  DBMS: [
    {
      question: "What does DBMS stand for?",
      options: [
        "Database Management System",
        "Data Backup Management System",
        "Database Monitoring System",
        "Data Management Service",
      ],
      answer: "Database Management System",
    },
    {
      question: "Which SQL command is used to retrieve data?",
      options: ["GET", "SELECT", "FETCH", "READ"],
      answer: "SELECT",
    },
    {
      question: "Which key uniquely identifies each record in a table?",
      options: ["Foreign Key", "Primary Key", "Candidate Key", "Composite Key"],
      answer: "Primary Key",
    },
    {
      question: "Which SQL command is used to add a new record?",
      options: ["ADD", "INSERT", "CREATE", "UPDATE"],
      answer: "INSERT",
    },
    {
      question: "Which normal form removes repeating groups?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: "1NF",
    },
    {
      question: "Which SQL command is used to modify existing records?",
      options: ["CHANGE", "MODIFY", "UPDATE", "ALTER"],
      answer: "UPDATE",
    },
    {
      question: "A foreign key is mainly used to establish what?",
      options: [
        "A relationship between tables",
        "A database backup",
        "A new database",
        "A password",
      ],
      answer: "A relationship between tables",
    },
    {
      question: "Which SQL command removes a table completely?",
      options: ["DELETE", "REMOVE", "DROP", "CLEAR"],
      answer: "DROP",
    },
    {
      question: "What is a collection of related data organized in tables called?",
      options: ["Database", "Record", "Attribute", "Query"],
      answer: "Database",
    },
    {
      question: "Which SQL clause is used to filter rows?",
      options: ["ORDER BY", "WHERE", "GROUP BY", "SELECT"],
      answer: "WHERE",
    },
  ],

  "Computer Networks": [
    {
      question: "What does LAN stand for?",
      options: [
        "Local Area Network",
        "Large Area Network",
        "Long Area Network",
        "Local Access Network",
      ],
      answer: "Local Area Network",
    },
    {
      question: "Which device connects different networks?",
      options: ["Switch", "Router", "Hub", "Repeater"],
      answer: "Router",
    },
    {
      question: "Which layer of the OSI model is responsible for routing?",
      options: [
        "Transport Layer",
        "Network Layer",
        "Data Link Layer",
        "Session Layer",
      ],
      answer: "Network Layer",
    },
    {
      question: "What is the full form of IP?",
      options: [
        "Internet Protocol",
        "Internet Process",
        "Internal Protocol",
        "Internet Program",
      ],
      answer: "Internet Protocol",
    },
    {
      question: "Which protocol is commonly used to access web pages?",
      options: ["FTP", "HTTP", "SMTP", "SNMP"],
      answer: "HTTP",
    },
    {
      question: "Which device forwards data using MAC addresses?",
      options: ["Router", "Switch", "Modem", "Gateway"],
      answer: "Switch",
    },
    {
      question: "Which protocol is used for sending emails?",
      options: ["HTTP", "FTP", "SMTP", "DNS"],
      answer: "SMTP",
    },
    {
      question: "Which OSI layer provides end-to-end communication?",
      options: [
        "Physical Layer",
        "Transport Layer",
        "Network Layer",
        "Presentation Layer",
      ],
      answer: "Transport Layer",
    },
    {
      question: "What does DNS primarily do?",
      options: [
        "Encrypts files",
        "Translates domain names into IP addresses",
        "Transfers emails",
        "Controls routers",
      ],
      answer: "Translates domain names into IP addresses",
    },
    {
      question: "Which topology connects all devices to a central device?",
      options: ["Bus", "Ring", "Star", "Mesh"],
      answer: "Star",
    },
  ],

  DSA: [
    {
      question: "Which data structure follows LIFO?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: "Stack",
    },
    {
      question: "Which data structure follows FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
    },
    {
      question: "What is the time complexity of binary search on a sorted array?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      answer: "O(log n)",
    },
    {
      question: "Which data structure is made up of nodes connected by links?",
      options: ["Array", "Linked List", "Stack", "Queue"],
      answer: "Linked List",
    },
    {
      question: "Which sorting algorithm repeatedly selects the smallest element?",
      options: [
        "Bubble Sort",
        "Selection Sort",
        "Merge Sort",
        "Quick Sort",
      ],
      answer: "Selection Sort",
    },
    {
      question: "Which data structure is commonly used for BFS?",
      options: ["Stack", "Queue", "Heap", "Array"],
      answer: "Queue",
    },
    {
      question: "Which data structure is commonly used for DFS?",
      options: ["Queue", "Stack", "Heap", "Hash Table"],
      answer: "Stack",
    },
    {
      question: "What is the worst-case time complexity of linear search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: "O(n)",
    },
    {
      question: "Which data structure stores elements in key-value pairs?",
      options: ["Stack", "Queue", "Hash Table", "Linked List"],
      answer: "Hash Table",
    },
    {
      question: "Which traversal visits the root between the left and right subtrees?",
      options: ["Preorder", "Inorder", "Postorder", "Level Order"],
      answer: "Inorder",
    },
  ],
};
