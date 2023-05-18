import React from 'react';
import { render, screen, waitFor, not } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

beforeEach(() => {
    render(<IletisimFormu/>);
  });

test('hata olmadan render ediliyor', async() => {
    // render(<IletisimFormu/>);
});

test('iletişim formu headerı render ediliyor', async() => {
    // render(<IletisimFormu />);
    const headerComponent = screen.getByText('İletişim Formu');
    expect(headerComponent).toBeInTheDocument();
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    const nameComponent = screen.getByLabelText("Ad*");
    userEvent.type(nameComponent, "test"); 

    const errors = screen.getAllByTestId("error");
    expect(errors.length).toEqual(1);
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    const buttonComponent = screen.getByRole("button");
    userEvent.click(buttonComponent);
    const errors = screen.getAllByTestId("error");
    expect(errors.length).toEqual(3);

});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    const nameComponent = screen.getByLabelText("Ad*");
    userEvent.type(nameComponent, "test5"); 
    const surnameComponent = screen.getByLabelText("Soyad*");
    userEvent.type(surnameComponent, "surname"); 
    const buttonComponent = screen.getByRole("button");
    userEvent.click(buttonComponent);

    const errors = screen.getAllByTestId("error");
    expect(errors.length).toEqual(1);

});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    const mailComponent = screen.getByLabelText("Email*");
    // expect(mailComponent).toBeInTheDocument();
    userEvent.type(mailComponent, "test@mailcom");

    const errors = screen.getByTestId("error");
    expect(errors).toHaveTextContent("email geçerli bir email adresi olmalıdır.");
    // expect(screen.getByText("Hata: email geçerli bir email adresi olmalıdır.")).toBeInTheDocument();
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    const nameComponent = screen.getByLabelText("Ad*");
    userEvent.type(nameComponent, "test5"); 
    const surnameComponent = screen.getByLabelText("Soyad*");
    const mailComponent = screen.getByLabelText("Email*");
    userEvent.type(mailComponent, "test@mail.com");

    const buttonComponent = screen.getByRole("button");
    userEvent.click(buttonComponent);

    const errors = screen.getByTestId("error");
    // expect(errors.length).toEqual(1);
    expect(errors).toHaveTextContent("soyad gereklidir.")

});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    const nameComponent = screen.getByLabelText("Ad*");
    userEvent.type(nameComponent, "test5"); 
    const surnameComponent = screen.getByLabelText("Soyad*");
    userEvent.type(surnameComponent, "Surname"); 
    const mailComponent = screen.getByLabelText("Email*");
    userEvent.type(mailComponent, "test@mail.com");

    const buttonComponent = screen.getByRole("button");
    userEvent.click(buttonComponent);

    expect(screen.queryByTestId("error")).toBe(null);



});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    const nameComponent = screen.getByLabelText("Ad*");
    userEvent.type(nameComponent, "test5"); 
    const surnameComponent = screen.getByLabelText("Soyad*");
    userEvent.type(surnameComponent, "Surname"); 
    const mailComponent = screen.getByLabelText("Email*");
    userEvent.type(mailComponent, "test@mail.com");
    const mesajComponent = screen.getByLabelText("Mesaj");
    userEvent.type(mesajComponent, "Mesaj"); 

    const buttonComponent = screen.getByRole("button");
    userEvent.click(buttonComponent);

    const firstnameComponent = screen.getByTestId("firstnameDisplay");
    expect(firstnameComponent).toHaveTextContent("test5");
    const lastnameComponent = screen.getByTestId("lastnameDisplay");
    expect(lastnameComponent).toHaveTextContent("Surname");
    const emailComponent = screen.getByTestId("emailDisplay");
    expect(emailComponent).toHaveTextContent("test@mail.com");
    const messageComponent = screen.getByTestId("messageDisplay");
    expect(messageComponent).toHaveTextContent("Mesaj");


});
