// import { describe } from "vitest";
// import { render } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import Login from "../Auth/Login";
// import { AuthContext } from "../Context/ContextProvider";

// describe("Login", () => {

//     it("should successfully log in with valid Google credentials", async () => {
//         const mockUser = {
//           displayName: "Test User",
//           email: "test@example.com",
//           photoURL: "https://example.com/photo.jpg",
//         };
//         const mockResult = { user: mockUser };
//         const mockNavigate = vi.fn();
//         const mockSetUser = vi.fn();
      
//         vi.mock("firebase/auth", () => ({
//           signInWithPopup: vi.fn().mockResolvedValue(mockResult),
//           GoogleAuthProvider: vi.fn(),
//         }));
      
//         vi.mock("react-router-dom", () => ({
//           ...vi.importActual("react-router-dom"),
//           useNavigate: () => mockNavigate,
//         }));
      
//         render(
//           <MemoryRouter>
//             <AuthContext.Provider
//               value={{
//                 setUser: mockSetUser,
//                 userEmail: "",
//                 setUserEmail: vi.fn(),
//                 password: "",
//                 setPassword: vi.fn(),
//                 error: "",
//                 setError: vi.fn(),
//               }}
//             >
//               <Login />
//             </AuthContext.Provider>
//           </MemoryRouter>
//         );
      
//         const googleLoginButton = screen.getByText("Login with Google");
//         await userEvent.click(googleLoginButton);
      
//         expect(mockSetUser).toHaveBeenCalledWith(mockUser);
//         expect(mockNavigate).toHaveBeenCalledWith("/display/inbox");
//       });
// });
