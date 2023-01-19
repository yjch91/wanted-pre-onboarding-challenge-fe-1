# wanted-pre-onboarding-challenge-fe-1

#### 실행 동영상

<img src="https://user-images.githubusercontent.com/72038224/213517200-3ba26b90-5c2e-4408-a457-56b818525831.mov">

    auth/login <-> auth/signUp을 이동하면서 로그인, 회원가입을 할 수 있습니다.     
    로그인 토큰이 있는 상태에서 auth/login이나 auth/signUp 페이지로 접근 시 홈페이지로 이동됩니다.   
    /은 홈페이지로 로그인을 해야만 접근가능한 페이지입니다. 로그인 토큰없이 접근시 auth/login으로 이동됩니다.      
    홈페이지에서는 todoList와 todoDetail을 보여줍니다. todoList에서 원하는 todo를 클릭 시 todoDetail을 볼 수 있습니다.   

***
#### 실행 방법
***

[API 링크]:[https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)] 설치 후 실행
    npm install
    npm start
http://localhost:3000/ 접속 (기본포트: 3000)

***
#### 구현요구사항
***

- [x]  auth/login에 로그인 페이지 개발
- [x]  auth/signUp에 회원가입 페이지 개발
- [x]  이메일, 비밀번호 valid 체크
- [x]  이메일, 비밀번호가 valid 할때만 버튼 활성화
- [x]  이메일, 비밀번호 valid 하지 않을 때 메시지 보여주기
- [x]  로그인, 회원가입 실패 시 알려줄 Modal 구현
- [x]  로그인 성공시 localStorage에 토큰 저장
- [x]  토큰 존재 여부, 유효성 여부에 따라 페이지 리다이렉트 (Higher Order Component 이용)
- [x]  한 화면에서 Todo List와 Detail 영역 구분
- [x]  TodoList에서 Todo 목록 보여주기(제목만)
- [x]  TodoDetail에서 상세 내용 보여주기
- [x]  Todo 추가, 수정, 삭제 구현 (실시간 반영)
- [x]  Todo 추가, 수정, 삭제 시 실행 확인 Modal 구현
- [x]  Todo 추가, 수정, 삭제 시 에러 발생 시 Modal 구현
- [x]  Todo를 조회 순서에 따라 뒤로가기를 통하여 조회할 수 있도록 구현
- [x]  input 내용이 길어지는 경우 처리
- [x]  변수명, 함수명 등 
- [ ]  폴더 구조 개선
- [ ]  사용자에게 편리한 UI 생각하고 구현

***
#### 사용한 프레임워크 및 라이브러리
***

- react-router-dom
    - url에 따라서 페이지를 보여주게 도와주는 라이브러리로 쉽게 라우팅 기능을 사용할 수 있어서 사용했다.

- react-hook-form
    - 처음에는 useState, useEffect, input에 onChange를 이용해서 state를 change하고 바뀔때마다 확인해서 vaild 체크도 처리했다. 그러다가 다른 분에 과제를 보다가 react-hook-form이라는 것을 알게되었다. register에 등록하고 watch를 이용해서 어떤 값이 들어왔는지 체크할 수 있고 valid 체크까지 같이 처리할 수 있었고 react-hook-form으로 한번에 처리하면 좀 더 깔끔하게 코드가 정리할 수 있었다.

- react-query
    - react-query 없이 api 호출을 구현해보고 react-query로 바꿔서 구현해보았는데 제일 좋았던 점은 queryClient.invalidateQueries를 이용하여 Key만 알면 바로 바뀐 내용을 적용 시킬 수 있는 점이었다. 그리고 isLoading, isSuccess, isError를 사용할 수 있어서 편했다.   
    
- styled-components 
    - 이것도 다른 사람이 사용한 것을 보고 사용해보았는데 스타일을 입힌 태그 컴포넌트를 만들 수 있는 라이브러리였다. button, div 등을 자기가 원하는 이름, 원하는 스타일로 만들어서 사용할 수 있었다. 반복되서 자주 쓰이는 것을 한번 만들어 놓고 쓰면 좋을 것 같아서 버튼을 만들어서 사용해보았다. div를 loginContainer, loginForm 이런 이름으로 반환해서 사용하는 분도 있었는데 이렇게 하면 그냥 div로 하고 className을 주는 것보다 알아보기 편할 것 같았다.   

***
#### 폴더 구조
***

```bash
├── App.css
├── App.tsx
├── components
│   ├── Auth
│   │   ├── Input
│   │   │   ├── ConfirmPassword.tsx
│   │   │   ├── Email.tsx
│   │   │   ├── Password.tsx
│   │   │   └── type.ts
│   │   └── api
│   │       ├── mutation.ts
│   │       └── type.ts
│   ├── Modal
│   │   ├── CheckModal.tsx
│   │   ├── ErrorModal.tsx
│   │   └── type.ts
│   ├── Page
│   │   ├── Auth
│   │   │   ├── Login.tsx
│   │   │   ├── LoginCheckHoc.tsx
│   │   │   ├── SignUp.tsx
│   │   │   └── type.ts
│   │   ├── Home
│   │   │   ├── AuthCheckHoc.tsx
│   │   │   └── HomePage.tsx
│   │   └── NotFound.tsx
│   ├── Router
│   │   └── index.tsx
│   ├── Styled
│   │   └── index.ts
│   └── Todo
│       ├── CreateTodo.tsx
│       ├── Input
│       │   ├── Content.tsx
│       │   ├── Title.tsx
│       │   └── type.ts
│       ├── TodoDetail.tsx
│       ├── TodoList.tsx
│       ├── TodoListItem.tsx
│       ├── api
│       │   ├── mutation.ts
│       │   ├── query.ts
│       │   └── type.ts
│       └── type.ts
├── constants
│   └── index.ts
├── index.css
├── index.tsx
├── react-app-env.d.ts
└── styles
    ├── common.css
    ├── modal.css
    ├── signStyle.css
    └── todoStyle.css
```


