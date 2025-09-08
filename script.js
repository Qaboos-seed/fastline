
// تسجيل مستخدم جديد
function registerUser() {
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirmPassword').value;

  if (!username || !email || !password || password !== confirmPassword) {
    alert("يرجى إدخال جميع الحقول بشكل صحيح");
    return;
  }

  let user = { username, email, password };
  localStorage.setItem("user_" + username, JSON.stringify(user));
  alert("تم التسجيل بنجاح!");
  window.location.href = "login.html";
}

// تسجيل الدخول
function loginUser() {
  let username = document.getElementById('usernameLogin').value;
  let password = document.getElementById('passwordLogin').value;
  let userData = localStorage.getItem("user_" + username);
  if (!userData) {
    alert("المستخدم غير موجود");
    return;
  }

  let user = JSON.parse(userData);
  if (user.password !== password) {
    alert("كلمة المرور غير صحيحة");
    return;
  }



  localStorage.setItem("currentUser", username);
  alert("تم تسجيل الدخول!");
  window.location.href = "orders.html";

}


function submitOrder() {

    
  let currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    alert("يرجى تسجيل الدخول");
    window.location.href = "login.html";
        // window.location.href = "logine.html";

    return;
  }
let name=document.getElementById("ordername").value;
  let title = document.getElementById("orderTitle").value;
  let details = document.getElementById("orderDetails").value;
  let location = document.getElementById("orderLocation").value;
  let phone = document.getElementById("orderPhone").value;

  if (!title || !details || !location || !phone || !name) {
    alert("يرجى ملء كل الحقول");
    return;
  }

  let order = {
    username: currentUser,
    name,
    title,
    details,
    location,
    phone,
    date: new Date().toLocaleString()
  };

  let orders = JSON.parse(localStorage.getItem("order") || "[]");
  orders.push(order);
  localStorage.setItem("order", JSON.stringify(orders));
  alert("تم إرسال الطلب!");
  window.location.href = "myorders.html";
}

// عرض الطلبات الخاصة بالمستخدم
window.onload = function () {
  if (document.getElementById("ordersList")) {
    let currentUser = localStorage.getItem("currentUser");
    let orders = JSON.parse(localStorage.getItem("order") || "[]");
    let myOrders = orders.filter(order => order.username === currentUser);
    let listDiv = document.getElementById("ordersList");

    if (myOrders.length === 0) {
      listDiv.innerHTML = "<p>لا توجد طلبات حتى الآن.</p>";
      return;
    }

    myOrders.forEach(order => {
      let div = document.createElement("div");
      div.innerHTML = `
        <strong>${order.title}</strong><br>
         الاسم: ${order.name}<br>

        التفاصيل: ${order.details}<br>
        الموقع: ${order.location}<br>
        رقم الهاتف: ${order.phone}<br>
        التاريخ: ${order.date}<br><hr>
      `;
      listDiv.appendChild(div);
    });
  }
};
