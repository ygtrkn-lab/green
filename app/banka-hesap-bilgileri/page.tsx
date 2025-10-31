import { CreditCard, Building2, ShieldCheck, Banknote } from 'lucide-react'
import CopyButton from '../components/CopyButton'
import CorporateLayout from '../components/CorporateLayout'
import CorporateSection from '../components/CorporateSection'
import CorporateInfoCard from '../components/CorporateInfoCard'

const bankAccounts = [
  {
    bank: 'Türkiye İş Bankası',
    branch: 'Ümraniye Şubesi',
    accountName: 'Green Planet Gaming Teknoloji A.Ş.',
    accountNumber: '1234 5678 9012 3456',
    iban: 'TR12 0006 4000 0011 2345 6789 01',
    swift: 'ISBKTRIS',
    accent: 'blue' as const
  },
  {
    bank: 'Garanti BBVA',
    branch: 'Ataşehir Şubesi',
    accountName: 'Green Planet Gaming Teknoloji A.Ş.',
    accountNumber: '9876 5432 1098 7654',
    iban: 'TR98 0006 2000 0000 0006 2956 26',
    swift: 'TGBATRIS',
    accent: 'emerald' as const
  },
  {
    bank: 'Yapı Kredi Bankası',
    branch: 'Şerifali Şubesi',
    accountName: 'Green Planet Gaming Teknoloji A.Ş.',
    accountNumber: '1111 2222 3333 4444',
    iban: 'TR11 0006 7010 0000 0017 2956 85',
    swift: 'YAPITRIS',
    accent: 'amber' as const
  }
]

const BankAccountPage = () => {
  const lastUpdated = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

  return (
    <CorporateLayout
      title="Banka Hesap Bilgileri"
      subtitle="Havale ve EFT ödemeleriniz için güvenli bankacılık bilgilerimiz. Her işlem Green Planet Gaming güvencesiyle korunur."
      heroImage="/images/hero/bank.jpg"
      heroBadge="Finans"
      lastUpdatedLabel={lastUpdated}
    >
      <CorporateSection
        title="Ödeme Güvenliği"
        icon={<ShieldCheck className="h-5 w-5" />}
      >
        <p>
          Havale/EFT işlemlerinizde yalnızca aşağıdaki hesapları kullanarak ödeme yapmanızı rica ederiz. Ödeme açıklamasında sipariş numaranızı belirtmeniz, sürecin hızlıca eşleştirilmesini sağlar.
        </p>
        <div className="not-prose mt-6 rounded-2xl border border-amber-200/60 bg-amber-50/70 p-5 text-sm text-amber-700">
          <h3 className="mb-2 text-base font-semibold text-amber-900">Önemli Uyarı</h3>
          <ul className="list-disc space-y-1 pl-4">
            <li>Yalnızca listelenen hesaplara yapılan ödemeler geçerlidir.</li>
            <li>Farklı hesaplara yapılan transferlerden şirketimiz sorumlu değildir.</li>
            <li>Havale/EFT dekontunuzu müşteri hizmetleri ile paylaşmayı unutmayın.</li>
          </ul>
        </div>
      </CorporateSection>

      <CorporateSection
        title="Banka Hesaplarımız"
        icon={<Building2 className="h-5 w-5" />}
        description="Ödeme yapabileceğiniz banka hesap bilgileri. Kopyalama butonlarıyla pratik şekilde bilgileri alın."
      >
        <div className="not-prose grid gap-5">
          {bankAccounts.map(account => (
            <CorporateInfoCard
              key={account.bank}
              title={`${account.bank} · ${account.branch}`}
              icon={<Building2 className="h-5 w-5" />}
              accent={account.accent}
            >
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hesap Sahibi</p>
                      <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                        <span className="text-sm font-medium text-slate-800">{account.accountName}</span>
                        <CopyButton text={account.accountName} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hesap Numarası</p>
                      <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                        <span className="font-mono text-sm text-slate-800">{account.accountNumber}</span>
                        <CopyButton text={account.accountNumber.replace(/\s/g, '')} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">IBAN</p>
                      <div className="mt-2 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4">
                        <span className="font-mono text-base text-slate-900">{account.iban}</span>
                        <CopyButton text={account.iban.replace(/\s/g, '')} size="md" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">SWIFT Kodu</p>
                      <div className="mt-2 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                        <span className="font-mono text-sm text-slate-800">{account.swift}</span>
                        <CopyButton text={account.swift} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CorporateInfoCard>
          ))}
        </div>
      </CorporateSection>

      <CorporateSection
        title="Ödeme Talimatları"
        icon={<CreditCard className="h-5 w-5" />}
        description="Havale veya EFT işleminin sorunsuz ilerlemesi için izlemeniz gereken adımlar."
      >
        <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
          <CorporateInfoCard
            title="Havale/EFT Adımları"
            icon={<CreditCard className="h-5 w-5" />}
            accent="primary"
          >
            <ol className="list-decimal space-y-2 pl-4 text-sm text-slate-600">
              <li>Listelenen kurumlardan size uygun hesabı seçin.</li>
              <li>Transfer işlemini banka şubenizden veya mobil bankacılıktan başlatın.</li>
              <li>Açıklama alanına sipariş numaranızı ekleyin.</li>
              <li>Dekontu kaydedin veya ekran görüntüsünü alın.</li>
              <li>Dekontu WhatsApp, e-posta veya müşteri paneli üzerinden bize iletin.</li>
              <li>Ödemeniz onaylandığında sipariş hazırlık süreci başlatılır.</li>
            </ol>
          </CorporateInfoCard>

          <CorporateInfoCard
            title="Dekont Gönderim Kanalları"
            icon={<Banknote className="h-5 w-5" />}
            accent="emerald"
          >
            <div className="grid gap-4 md:grid-cols-3 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900">WhatsApp</p>
                <p>+90 216 473 36 01</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">E-posta</p>
                <p>odeme@green.net.tr</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Müşteri Paneli</p>
                <p>Hesabım {'>'} Siparişlerim</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-blue-700">
              <strong className="block text-blue-900">İpucu:</strong> İnternet bankacılığı ile yapılan işlemlerde dekontu WhatsApp üzerinden paylaşmanız onay süresini kısaltır.
            </div>
          </CorporateInfoCard>
        </div>
      </CorporateSection>
    </CorporateLayout>
  )
}

export default BankAccountPage
