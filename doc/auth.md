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

## service
- isAuthenticated (none: true|false)
- listAuthModules (none: [(name, none|form|rediret)])
- signin ((module, none|credential|redirect): true|false)
- signout (none: none)
- getUser (none: user)

## UI
- NonAuthenticated mainpage
- Module selection page
- Credential form
- Handle redirection ?
- Authenticated mainpage