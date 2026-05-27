# Alert Template

## Telegram 預警模板

```
🐝 蜂群預警 #{{evaluation_id}}

{{#if critical}}
🔴 等級：CRITICAL
{{else}}
⚠️ 等級：WARNING
{{/if}}

📊 異動股票：{{alert_count}} 支

{{#each alerts}}
【{{symbol}}】{{level_emoji}} {{trigger_description}}
  • {{metric_1}}: {{value_1}}
  • {{metric_2}}: {{value_2}}
  • 建議：{{recommendation}}

{{/each}}

⏰ 偵測時間：{{timestamp}}

---
🐝 AI Swarm Investing
```

## Email 預警模板

```html
<!DOCTYPE html>
<html>
<head>
  <title>蜂群預警 #{{evaluation_id}}</title>
</head>
<body>
  <h1>🐝 蜂群預警</h1>
  <p><strong>等級：</strong>{{level}}</p>
  <p><strong>時間：</strong>{{timestamp}}</p>

  <h2>異動股票</h2>
  <table>
    <tr>
      <th>股票</th>
      <th>觸發條件</th>
      <th>建議</th>
    </tr>
    {{#each alerts}}
    <tr>
      <td>{{symbol}}</td>
      <td>{{trigger_description}}</td>
      <td>{{recommendation}}</td>
    </tr>
    {{/each}}
  </table>

  <hr>
  <p>AI Swarm Investing</p>
</body>
</html>
```

## 變數說明

| 變數 | 類型 | 說明 |
|------|------|------|
| `evaluation_id` | string | 評估 ID |
| `level` | string | 預警等級（INFO/WARNING/CRITICAL） |
| `alert_count` | number | 異動股票數量 |
| `timestamp` | string | 偵測時間 |
| `alerts` | array | 異動詳情列表 |
| `alerts[].symbol` | string | 股票代碼 |
| `alerts[].trigger_description` | string | 觸發條件描述 |
| `alerts[].recommendation` | string | 建議行動 |
