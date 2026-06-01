export const metadata = {
  title: "プライバシーポリシー | A to B",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>

      <div className="prose prose-sm max-w-none text-gray-700 space-y-8">

        <section>
          <p className="text-sm text-gray-500 mb-6">
            A to B（以下「当サービス」）は、ユーザーの個人情報の保護を重要な責務と認識し、
            個人情報の保護に関する法律（個人情報保護法）を遵守し、以下のとおりプライバシーポリシーを定めます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. 事業者情報</h2>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[
                ["屋号", "A to B"],
                ["運営者", "[氏名または屋号]（開業届提出後に更新）"],
                ["所在地", "[住所]（開業届提出後に更新）"],
                ["お問い合わせ", "info@atob.jp"],
              ].map(([label, value]) => (
                <tr key={label} className="border-b border-gray-100">
                  <td className="py-2 pr-4 font-medium text-gray-600 w-32">{label}</td>
                  <td className="py-2 text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. 取得する情報</h2>
          <p className="mb-3">当サービスは、以下の情報を取得する場合があります。</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>アクセスログ（IPアドレス、ブラウザ種別、アクセス日時、参照URL）</li>
            <li>Cookie および類似の技術により取得される情報</li>
            <li>お問い合わせ等で任意にご提供いただく氏名・メールアドレス等</li>
            <li>メールマガジン登録時のメールアドレス</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">3. 利用目的</h2>
          <p className="mb-3">取得した情報は、以下の目的で利用します。</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>サービスの提供・運営・改善</li>
            <li>お問い合わせへの対応</li>
            <li>サービスの利用状況の分析および統計処理</li>
            <li>新機能・更新情報等のご案内（同意いただいた場合）</li>
            <li>不正利用の防止および利用規約違反への対処</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">4. 第三者への提供</h2>
          <p className="mb-3">
            当サービスは、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>ユーザーの事前同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>人の生命・身体・財産の保護のために必要な場合</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">5. アフィリエイトプログラムについて</h2>
          <p className="text-sm">
            当サービスは、CAMPFIRE・READYFOR・Bandcamp 等のアフィリエイトプログラムに参加しています。
            外部サービスへのリンクをクリックした際に、当サービスがアフィリエイト報酬を得る場合があります。
            該当リンクには「※PR」「※広告」と明記しています。
            アフィリエイトリンクを経由して取得されるクリック情報（匿名）は、
            各アフィリエイトサービスのプライバシーポリシーに基づき処理されます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">6. Cookie の利用について</h2>
          <p className="mb-3 text-sm">
            当サービスでは、サービス向上のために Cookie を利用しています。
            Cookie はブラウザの設定により無効化できますが、一部機能が利用できなくなる場合があります。
          </p>
          <p className="text-sm">
            Cookie によって取得した情報が個人を特定するものではなく、
            統計的な情報の収集のみを目的として使用します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">7. Google アナリティクスについて</h2>
          <p className="mb-3 text-sm">
            当サービスでは、サービス改善のために Google LLC が提供する Google アナリティクスを利用しています。
            Google アナリティクスは Cookie を使用してアクセス情報を収集しますが、
            個人を特定する情報は含まれません。
          </p>
          <p className="text-sm">
            収集された情報は Google のプライバシーポリシーに従って管理されます。
            Google アナリティクスのオプトアウトは、
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 underline"
            >
              Google アナリティクス オプトアウト アドオン
            </a>
            からご利用いただけます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">8. 外部サービスへのリンクについて</h2>
          <p className="text-sm">
            当サービスのリンク先となる外部ウェブサイト（CAMPFIRE・READYFOR・Bandcamp 等）に
            ついては、当サービスのプライバシーポリシーは適用されません。
            各外部サービスのプライバシーポリシーをご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">9. 個人情報の管理・保護</h2>
          <p className="text-sm">
            当サービスは、収集した個人情報の漏洩・滅失・毀損を防止するため、
            適切なセキュリティ対策を実施します。
            個人情報の取り扱いを委託する場合は、委託先において適切な管理が行われるよう監督します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">10. 個人情報の開示・訂正・削除</h2>
          <p className="text-sm">
            ご自身の個人情報の開示・訂正・削除・利用停止等をご希望の場合は、
            下記お問い合わせ先までご連絡ください。
            本人確認のうえ、法令の定める範囲内で速やかに対応します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">11. プライバシーポリシーの変更</h2>
          <p className="text-sm">
            本ポリシーは、法令の改正やサービス内容の変更に応じて適宜見直し・更新する場合があります。
            重要な変更については、当サービス上でお知らせします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">12. お問い合わせ</h2>
          <p className="text-sm">
            個人情報の取り扱いに関するご質問・ご相談は、以下までご連絡ください。
          </p>
          <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm">
            <p>屋号: A to B</p>
            <p>メール: info@atob.jp</p>
          </div>
        </section>

        <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
          制定日: 2026年6月1日
        </p>
      </div>
    </div>
  );
}
