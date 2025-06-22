import requests



headers = {

  'Content-Type': 'application/json',

  'Authorization': 'Bearer 0izTnThdoycdjYfE0DqG43Bt4Qql'

}



payload = {

    "BusinessShortCode": 522522,

    "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjUwNjE4MTUwMTEz",

    "Timestamp": "20250618150113",

    "TransactionType": "CustomerPayBillOnline",

    "Amount": 1,

    "PartyA": 254714415034,

    "PartyB": 522522,

    "PhoneNumber": 254714415034,

    "CallBackURL": "https://mydomain.com/path",

    "AccountReference": "1333898053",

    "TransactionDesc": "Payment of X"

  }


response = requests.request("POST", 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', headers = headers, json = payload)

print(response.text.encode('utf8'))