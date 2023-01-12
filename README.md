# wanted-pre-onboarding-challenge-fe-1

### 1번째 리팩토링
***

<details>
<summary>내용보기</summary>

사전과제 제출할 때 폴더 나누는 것은 생각하지 않아서 components 폴더에 모두 있었고 hook, type 등등 나누지않고   
필요한건 그 안에 다 만들어서 가독성이 좋지 않았다. 강의를 듣고 나누는 방식이 좀더 깔끔하고 가독성이 좋다는 것을    
알게되서 수정했다.  

변수명만 봐도 알아 볼 수 있도록 최대한 변수명을 고쳤다.   
   
사전과제를 할 때에는 react-query를 아예 사용하지않았는데 API 부분을 react-query를 사용하는 방식으로 수정   
   
로그인, 회원가입 부분에 setState를 이용해서 email, password를 바꾸고 넘겨주는식으로 했었는데   
react-hook-form을 사용하는 방식으로 수정   
   
강의 들으면서 Higher Order Component를 알게되었고 토큰이 없을때 login페이지로 이동시키는 것과    
이미 로그인 되어있을 때 login 또는 signup 페이지로 이동할 시 /로 이동시키도록 수정했다.   
처음에는 useNavigate()를 이용해서 useEffect에서 이동시키는 방식으로 구현했는데    
이렇게하니까 맨처음에 / 로 접속하면 login 페이지로 이동되는데 맨처음에 signup 페이지로 접속해도     
login 페이지로 이동하였다. 맨처음에 AuthCheckHoc이 실행될 때 useEffect 안에   
token이 없을 때 login 페이지로 이동하는 부분이 무조건 실행되서 login 페이지로만 가지는 것 같았다    
useNavigate()를 if 문 내에서 사용하면 될 것 같았는데 그렇게는 hook을 사용할 수 없다고 나왔고    
Navigate를 이용해서 하는 방식을 알게되서 수정했다.   

todo를 수정하거나 삭제할 때 확인 창이 뜨도록 수정했다. 하나의 Modal 컴포넌트를 만들고 두 군데서 다 사용할 수    
있도록 생각해서 해보았다.   

그외 가독성이 좋게 나눌 수 있는 부분을 찾아 수정하였다.   
</details>
