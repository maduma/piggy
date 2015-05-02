# Security Authentification module

__Firebase__ is used as backend. __AngularJS__ is the WEB frontend framework.

## requirements

            START               
              +                 
              |                 
      +-------+--------+        
      |nonauthenticated|
      +-------+--------+
              |
       +------+-------+
       |Type selection|  <---+  
       +------+-------+      |  
              |            FALSE
       +------+-------+      |  
       |ask credential|      |  
       +------+-------+      |  
              |              |  
    +---------+------------+ |  
    |authenticate the user?+-+  
    +---------+------------+     
              |                 
             TRUE               
              |                 
              v                 
       +------+------+          
       |authenticated|
       +------+------+          
              |                 
              +                 
             END                

## Authentification modules
- anonymous
- email (use credential form)
- facebook (use redirection)
- google (use redirection)
- twitter (use redirection)
- github (use redirection)

## service (pure function style: pass user as arg)
- isAuthenticated
  - in: user
  - out: true|false
- listAuthModules
  - in: none
  - out: name, none|form|redirect
- signin
  - in: module, none|credential|redirect
  - out: null|user
- signout:
  - in: user
  - out: none

## UI
- NonAuthenticated mainpage
- Module selection page
- Credential form
- Handle redirection ?
- Authenticated mainpage