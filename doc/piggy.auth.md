# Authentification module

## Use case

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
      +-------+-------+      |  
      |*ask credential|      |  
      +-------+-------+      |  
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
             
    * only for email type

## Authentification
- anonymous
- email (need credential)
- facebook (use redirection)
- google (use redirection)
- twitter (use redirection)
- github (use redirection)


## Dependency
May change the state of the [user](piggy.user.md)

- isAuthenticated: true | false
- uid: null | authenticated uid

### methods
- signin
  - in: undefined|credential|facebook
  - out: true|false
- signout:
  - in: undefined
  - out: undefined

## UI
- NonAuthenticated mainpage
- Module selection page
- Credential form
- Handle redirection ?
- Authenticated mainpage