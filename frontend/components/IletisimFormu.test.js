import React from 'react';
import { render, screen, waitFor, not } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

const getNameInput = () => screen.getByLabelText("Ad*"); //Ad inputu seçimi

const setNameInput = (val) =>{userEvent.type(getNameInput(), val);} //Ad inputuna veri girişi

const getSurnameInput = () => screen.getByLabelText("Soyad*"); //Soyad inputu seçimi

const setSurnameInput = (val) =>{userEvent.type(getSurnameInput(), val);} //Soyad inputuna veri girişi

const getEmailInput = () => screen.getByLabelText("Email*"); //Email inputu seçimi

const setEmailInput = (val) =>{userEvent.type(getEmailInput(), val);}  //Email inputuna veri girişi

const buttonClick = () => {userEvent.click(screen.getByRole("button"));} //Buton seçim ve click

const getError = () => screen.queryByTestId("error");   //error id'li elementin seçimi

const getAllErrors = () => screen.queryAllByTestId("error"); // error id'li tüm elementlerin seçimi. Array döndürür


beforeEach(() => {
    render(<IletisimFormu/>);
  });

test('hata olmadan render ediliyor', async() => {
    //beforeEach
});

test('iletişim formu headerı render ediliyor', async() => {
    expect(screen.getByText('İletişim Formu')).toBeInTheDocument();
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    setNameInput("test")
    expect(getAllErrors().length).toEqual(1);
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    buttonClick();
    expect(getAllErrors().length).toEqual(3);
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    setNameInput("İhsan")
    setSurnameInput("Yazarel")
    buttonClick();
    expect(getAllErrors().length).toEqual(1);
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    setEmailInput("wrong@mail");
    expect(getError()).toHaveTextContent("email geçerli bir email adresi olmalıdır.");
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    setNameInput("İhsan")
    getSurnameInput();
    setEmailInput("test@mail.com");
    buttonClick();
    expect(getError()).toHaveTextContent("soyad gereklidir.")
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    setNameInput("İhsan");
    setSurnameInput("Yazarel");
    setEmailInput("test@mail.com");
    buttonClick();
    expect(getError()).not.toBeInTheDocument();
});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    setNameInput("İhsan");
    setSurnameInput("Yazarel");
    setEmailInput("test@mail.com");
    userEvent.type(screen.getByLabelText("Mesaj"), "Herhangi bir mesaj"); 
    buttonClick();
    expect(screen.getByTestId("firstnameDisplay")).toHaveTextContent("İhsan");
    expect(screen.getByTestId("lastnameDisplay")).toHaveTextContent("Yazarel");
    expect(screen.getByTestId("emailDisplay")).toHaveTextContent("test@mail.com");
    expect(screen.getByTestId("messageDisplay")).toHaveTextContent("Mesaj");
});
