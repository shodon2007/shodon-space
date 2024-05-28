import {FC} from "react";
import Input from "src/shared/ui/Input/Input";
import cls from "./LoginPage.module.scss";
import Button from "src/shared/ui/Buttons/authSubmitBtn/Button";
import Block from "src/shared/ui/Block/Block";
import {Title} from "src/shared/ui/Title/Title";
import MyLink from "src/shared/ui/Link/Link";
import {setUser, userApi} from "src/entities";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {AuthRequest} from "src/entities/User/model/Auth";
import {toast} from "react-toastify";
import {useAppDispatch} from "src/shared/lib/store";
import {useNavigate} from "react-router-dom";
import {ApiError} from "src/shared/types/error/errorTypes";
import {useTranslation} from "react-i18next";

const LoginPage: FC = () => {
	const [loginUser] = userApi.useFetchLoginMutation();
	const {t} = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {control, handleSubmit} = useForm<AuthRequest>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const submit: SubmitHandler<AuthRequest> = async (data) => {
		const resp = await loginUser(data);
		if ("error" in resp) {
			const error = resp.error as ApiError;
			toast.error(error.data?.message, {
				autoClose: 2000,
			});
		} else {
			dispatch(setUser(resp.data));
			navigate("/");
		}
	};

	return (
		<form onSubmit={handleSubmit(submit)}>
			<Block className={cls.page}>
				<Title>{t("login.title")}</Title>
				<div className={cls.inputs}>
					<Controller
						control={control}
						name="email"
						render={({field}) => {
							return <Input placeholder={t("login.emailInput")} {...field} />;
						}}
					/>
					<Controller
						control={control}
						name="password"
						render={({field}) => {
							return (
								<Input
									placeholder={t("login.passwordInput")}
									type="password"
									{...field}
								/>
							);
						}}
					/>
				</div>
				<div className={cls.bottom}>
					<Button type="submit">{t("login.submitButton")}</Button>
					<MyLink to="/registration">{t("login.registrationButton")}</MyLink>
				</div>
			</Block>
		</form>
	);
};

export default LoginPage;
