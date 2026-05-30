# Gemini Desktop

![Gemini](https://github.com/BartuAbiHD/gemini-desktop/blob/main/images/Gemini.png?raw=true)

Gemini Desktop, Gemini'ı kullanmak için [ElectronJS](https://www.electronjs.org) ile oluşturulmuş basit bir masaüstü uygulamasıdır.

## Özellikler

- **Hızlı Geçiş (Global Kısayol)**: Bilgisayarınızın neresinde olursanız olun, `Alt + Space` tuşlarına basarak Gemini penceresini anında gösterebilir veya gizleyebilirsiniz.
- **Arka Planda Çalışma**: Uygulama kapatıldığında akıllıca Sistem Tepsisine (System Tray) küçülür, böylece yeniden başlatmaya gerek kalmadan hızlı erişim sağlar. Sistem tepsisindeki ikona tıklayarak veya `Alt + Space` ile pencereyi geri getirebilirsiniz.
- **Donanım Hızlandırma Kontrolü**: Performansı veya kararlılığı artırmak için doğrudan Sistem Tepsisi (Tray) menüsünden donanım hızlandırmayı açıp kapatabilirsiniz.
- **Dahili Reklam Engelleyici**: Temiz ve sorunsuz bir web deneyimi sağlamak için `@ghostery/adblocker-electron` ile entegre edilmiştir.

## Kurulum

Windows, Linux ve MacOS için en son [sürümü (release)](https://github.com/BartuAbiHD/gemini-desktop/releases) indirin.

Windows için standart bir çalıştırılabilir dosya (.exe) ve bir NuGet paketi sağlanmaktadır. Linux Dağıtımları için RPM ve DEB paketleri mevcuttur (test edilmemiştir!).

## Başlatma

Çalıştırmak için masaüstü kısayolu üzerinden veya doğrudan uygulamanın exe dosyası üzerinden başlatmanız yeterlidir.

## Derleme (Building)

Uygulamayı yerel olarak derlemek için depoyu klonlayın ve bağımlılıkları yükleyin.

```powershell
git clone https://github.com/BartuAbiHD/gemini-desktop.git
cd gemini-desktop
npm install
```

Uygulamayı yerel olarak (geliştirici modunda) test etmek için:

```powershell
npm run test
```

Uygulamanın yükleyici (installer) dosyalarını oluşturmak için:

```powershell
npm run make
```

## Bağımlılıklar

- electron
- electron-forge
- electron-store
- @ghostery/adblocker-electron

## Hata Kaydı (Errata)

Logo [Wikipedia](https://commons.wikimedia.org/wiki/File:Gemini_sparkle_v002.svg)'dan alınmıştır.
